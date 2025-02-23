<script lang="ts">
	import type { PageProps } from './$types';

	import FeedItem from '$lib/components/feeds/feed-item.svelte';
	import PageListing from '$lib/components/page/page-listing.svelte';

	const { data }: PageProps = $props();
</script>

<PageListing subject="feeds">
	{#each data.pack.feeds ?? [] as feed (feed.uri)}
		<FeedItem item={feed} />
	{/each}
</PageListing>
