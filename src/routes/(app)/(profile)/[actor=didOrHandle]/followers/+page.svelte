<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import type { PageProps } from './$types';

	import { paginate } from '$lib/utils/pagination';

	import PageHeader from '$lib/components/page/page-header.svelte';
	import PageListing from '$lib/components/page/page-listing.svelte';
	import ProfileItem from '$lib/components/profiles/profile-item.svelte';

	const { data }: PageProps = $props();

	const { rootUrl, nextUrl } = $derived(paginate(page.url, data.followers.cursor));
</script>

<svelte:head>
	<title>Users following @{data.profile.handle} — {PUBLIC_APP_NAME}</title>
	<link rel="canonical" href="{base}/{data.profile.did}" />
</svelte:head>

<PageHeader title="Followers" />

<PageListing subject="profiles" {rootUrl} {nextUrl}>
	{#each data.followers.items as profile (profile.did)}
		<ProfileItem item={profile} />
	{/each}
</PageListing>
