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

	const { rootUrl, nextUrl } = $derived(
		paginate(page.url, data.following.cursor, `${base}/${data.profile.did}/following`),
	);
</script>

<svelte:head>
	<title>Users followed by @{data.profile.handle} — {PUBLIC_APP_NAME}</title>
</svelte:head>

<PageHeader title="Following" />

<PageListing subject="profiles" {rootUrl} {nextUrl}>
	{#each data.following.items as profile (profile.did)}
		<ProfileItem item={profile} />
	{/each}
</PageListing>
