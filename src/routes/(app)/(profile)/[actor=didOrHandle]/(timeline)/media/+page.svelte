<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import type { PageProps } from './$types';

	import { paginate } from '$lib/utils/pagination';

	import PageListing from '$lib/components/page/page-listing.svelte';
	import PostFeedItem from '$lib/components/timeline/post-feed-item.svelte';

	const { data }: PageProps = $props();

	const { rootUrl, nextUrl } = $derived(paginate(page.url, data.timeline.cursor));
</script>

<svelte:head>
	<title>@{data.profile.handle} — {PUBLIC_APP_NAME}</title>
	<link rel="canonical" href="{base}/{data.profile.did}" />
</svelte:head>

<PageListing subject="timeline" {rootUrl} {nextUrl}>
	{#each data.timeline.items as item (item.id)}
		<PostFeedItem {item} />
	{/each}
</PageListing>
