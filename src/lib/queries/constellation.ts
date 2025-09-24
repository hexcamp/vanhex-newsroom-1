import { error } from '@sveltejs/kit';

import type { Did } from '@atcute/lexicons';
import type { Records } from '@atcute/lexicons/ambient';
import { fromBase64Url, toBase64Url } from '@atcute/multibase';
import { decodeUtf8From, encodeUtf8 } from '@atcute/uint8array';

import * as v from 'valibot';

import { PUBLIC_APP_USER_AGENT, PUBLIC_CONSTELLATION_URL } from '$env/static/public';

import { didString, integer, nsidString, recordKeyString } from '$lib/types/valibot';

const linkResponse = v.object({
	total: integer,
	cursor: v.nullable(v.string()),
	linking_records: v.array(
		v.object({
			did: didString,
			collection: nsidString,
			rkey: recordKeyString,
		}),
	),
});

interface LinkResponse<K extends keyof Records> {
	total: number;
	cursor: string | null;
	linking_records: Array<{
		did: Did;
		collection: K;
		rkey: string;
	}>;
}

export const getLinks = async <K extends keyof Records>({
	uri,
	collection,
	path,
	limit = 10,
	cursor = null,
}: {
	uri: string;
	collection: K;
	path: string;
	limit?: number;
	cursor?: string | null;
}): Promise<LinkResponse<K>> => {
	const requestUrl =
		`${PUBLIC_CONSTELLATION_URL}/links` +
		`?target=${encodeURIComponent(uri)}` +
		`&collection=${collection}` +
		`&path=${path}` +
		`&limit=${limit}` +
		(cursor ? `&cursor=${cursor}` : '');

	const response = await fetch(requestUrl, {
		headers: {
			'user-agent': PUBLIC_APP_USER_AGENT,
		},
	});
	if (!response.ok) {
		// @todo: replace this with a non-SvelteKit error
		error(503, `Constellation API returned ${response.status}`);
	}

	const rawJson = await response.json();
	const json = v.parse(linkResponse, rawJson);

	return json as LinkResponse<K>;
};

const multiPathCursor = v.tuple([v.string(), v.nullable(v.string())]);

/**
 * generate multi path cursor
 * @param path current path
 * @param subcursor sub cursor
 * @returns compressed cursor
 */
const generateMultiPathCursor = (path: string, subcursor: string | null): string => {
	const mp: v.InferOutput<typeof multiPathCursor> = [path, subcursor];
	const json = JSON.stringify(mp);

	return toBase64Url(encodeUtf8(json));
};

// due to the way Bluesky has designed its embeds, quotes can be in two
// different paths, `.embed.record.uri` and `.embed.record.record.uri`.
//
// since Constellation can only support one path at a time, here's a function
// that will make this happen really nicely
export const getLinksMultiPath = async <K extends keyof Records>({
	uri,
	collection,
	paths,
	limit = 10,
	cursor = null,
}: {
	uri: string;
	collection: K;
	paths: [string, string, ...string[]];
	limit?: number;
	cursor?: string | null;
}): Promise<LinkResponse<K>> => {
	let index = 0;
	let curs: string | null = null;

	const result: LinkResponse<K> = {
		// this will never be anything other than 0 unfortunately,
		// can't make it work across different paths
		total: 0,
		cursor: null,
		linking_records: [],
	};

	if (cursor !== null) {
		try {
			const raw = decodeUtf8From(fromBase64Url(cursor));
			const json = JSON.parse(raw);

			const [currentPath, subCursor] = v.parse(multiPathCursor, json);
			const foundIndex = paths.indexOf(currentPath);

			if (foundIndex === -1) {
				return result;
			}

			index = foundIndex;
			curs = subCursor;
		} catch (e) {
			// If decompression or parsing fails, treat as invalid cursor
			return result;
		}
	}

	while (index < paths.length) {
		const data = await getLinks({
			uri: uri,
			collection: collection,
			path: paths[index],
			limit: limit - result.linking_records.length,
			cursor: curs,
		});

		result.linking_records = [...result.linking_records, ...data.linking_records];

		// response returned a cursor, so we're breaking early
		if (data.cursor !== null) {
			result.cursor = generateMultiPathCursor(paths[index], data.cursor);
			break;
		}

		// we've reached the limit
		if (result.linking_records.length >= limit) {
			break;
		}

		// move to the next path
		index++;
		curs = null;
		result.cursor = index < paths.length ? generateMultiPathCursor(paths[index], null) : null;
	}

	return result;
};
