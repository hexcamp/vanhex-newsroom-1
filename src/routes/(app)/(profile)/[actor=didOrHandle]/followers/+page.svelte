<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import type { PageProps } from './$types';

	import PageHeader from '$lib/components/page/page-header.svelte';
	import PageListing from '$lib/components/page/page-listing.svelte';
	import ProfileItem from '$lib/components/profiles/profile-item.svelte';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Users following @{data.profile.handle} — {PUBLIC_APP_NAME}</title>
	<link rel="canonical" href="{base}/{data.profile.did}" />
</svelte:head>

<PageHeader title="Followers" />

<PageListing subject="profiles" root={!page.url.searchParams.get('cursor')} cursor={data.followers.cursor}>
	{#each data.followers.items as profile (profile.did)}
		<ProfileItem item={profile} />
	{/each}
</PageListing>
