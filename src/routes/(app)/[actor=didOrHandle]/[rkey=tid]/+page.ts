import { simpleFetchHandler, XRPC, XRPCError } from '@atcute/client';
import type { AppBskyFeedGetPostThread } from '@atcute/client/lexicons';
import { error } from '@sveltejs/kit';

import { PUBLIC_APPVIEW_URL } from '$env/static/public';
import type { PageLoad } from './$types';

import { resolveHandle } from '$lib/queries/handle';
import { makeAtUri } from '$lib/types/at-uri';
import { isDid, type Did } from '$lib/types/identity';

export const load: PageLoad = async ({ params }) => {
	const rpc = new XRPC({ handler: simpleFetchHandler({ service: PUBLIC_APPVIEW_URL }) });

	let did: Did;
	if (!isDid(params.actor)) {
		try {
			did = await resolveHandle({ rpc, handle: params.actor });
		} catch (err) {
			if (err instanceof XRPCError) {
				switch (err.kind) {
					case 'InvalidRequest': {
						error(404, `Account doesn't exist`);
					}
				}
			}

			throw err;
		}
	} else {
		did = params.actor;
	}

	const uri = makeAtUri(did, 'app.bsky.feed.post', params.rkey);

	let data: AppBskyFeedGetPostThread.Output;

	try {
		const response = await rpc.get('app.bsky.feed.getPostThread', {
			params: {
				uri: uri,
				depth: 4,
				parentHeight: 10,
			},
		});

		data = response.data;
	} catch (err) {
		if (err instanceof XRPCError) {
			switch (err.kind) {
				case 'NotFound': {
					error(404, `Post not found`);
				}
			}
		}

		throw err;
	}

	const thread = data.thread;
	switch (thread.$type) {
		case 'app.bsky.feed.defs#notFoundPost': {
			error(404, `Post not found`);
		}
		case 'app.bsky.feed.defs#blockedPost': {
			// shouldn't happen?
			error(404, `Blocked post`);
		}
	}

	return { thread, threadgate: data.threadgate };
};
