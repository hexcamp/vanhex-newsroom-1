import { simpleFetchHandler, XRPC } from '@atcute/client';
import { mapDefined } from '@mary/array-fns';

import { PUBLIC_APP_URL, PUBLIC_APPVIEW_URL } from '$env/static/public';

import { fetchTimeline, ProfileFilter, TimelineType } from '$lib/queries/timeline';
import { createRssFeed, feedPostToFeedItem } from '$lib/rss';
import { type Did } from '$lib/types/identity';

export const GET = async ({ params, fetch }) => {
	const rpc = new XRPC({ handler: simpleFetchHandler({ service: PUBLIC_APPVIEW_URL }) });

	const profile = await (async () => {
		const { data } = await rpc.get('app.bsky.actor.getProfile', {
			params: {
				actor: params.actor,
			},
		});

		return data;
	})();

	const { items } = await fetchTimeline({
		rpc,
		params: {
			type: TimelineType.PROFILE,
			actor: profile.did as Did,
			filter: ProfileFilter.POSTS,
			pinned: false,
		},
	});

	const rss = createRssFeed({
		meta: {
			title: profile.displayName?.trim() || `@${profile.handle}`,
			description: `Posts from @${profile.handle}`,
			pageUrl: `${PUBLIC_APP_URL}/${profile.did}`,
			rssUrl: `${PUBLIC_APP_URL}/${profile.did}/rss`,
			image: profile.avatar ? { src: profile.avatar } : undefined,
		},
		items: mapDefined(items, (item) => {
			if (item.reason?.$type === 'app.bsky.feed.defs#reasonRepost') {
				return;
			}

			return feedPostToFeedItem(item);
		}),
	});

	return new Response(rss, {
		headers: {
			'content-type': 'application/rss+xml; charset=utf-8',
			'cache-control': 'public, max-age=300', // 5 minutes
		},
	});
};
