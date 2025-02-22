<script lang="ts">
	import type { AppBskyFeedDefs } from '@atcute/client/lexicons';

	import { PUBLIC_APP_NAME, PUBLIC_APP_URL } from '$env/static/public';

	import { parseAtUri } from '$lib/types/at-uri';

	interface Props {
		feed: AppBskyFeedDefs.GeneratorView;
	}

	const { feed }: Props = $props();

	const uri = $derived(parseAtUri(feed.uri));

	const description = $derived.by(() => {
		const desc = feed.description?.trim();

		let str = '';

		str += `Feed by @${feed.creator.handle}`;

		if (desc) {
			str += `\n\n${desc}`;
		}

		return str;
	});
</script>

<svelte:head>
	<meta property="og:site_name" content={PUBLIC_APP_NAME} />
	<meta property="twitter:card" content="summary" />
	<meta property="og:url" content="{PUBLIC_APP_URL}/{uri.repo}/feeds/{uri.rkey}" />
	<meta property="og:title" content={feed.displayName.trim()} />
	<meta property="og:description" content={description} />

	{#if feed.avatar}
		<meta property="og:image" content={feed.avatar.replace('@jpeg', '@png')} />
	{/if}
</svelte:head>
