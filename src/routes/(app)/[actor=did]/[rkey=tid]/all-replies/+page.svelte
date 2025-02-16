<script lang="ts">
	import { page } from '$app/state';
	import type { PageProps } from './$types';

	import PageContainer from '$lib/components/page/page-container.svelte';
	import PageHeader from '$lib/components/page/page-header.svelte';
	import { paginate } from '$lib/utils/pagination';

	import Descendants from '../../../[actor=didOrHandle]/[rkey=tid]/components/descendants.svelte';

	const { data }: PageProps = $props();

	const { rootUrl, nextUrl } = $derived(paginate(page.url, data.cursor));
</script>

<PageContainer>
	<PageHeader title="All replies" />

	<div class="listing">
		{#if rootUrl}
			<a href={rootUrl} class="button latest-button">Show latest replies</a>
		{/if}

		<div class="descendants">
			<Descendants thread={data.thread} threadgate={data.threadgate} />
		</div>

		{#if nextUrl}
			<a href={nextUrl} class="button more-button">Show more replies</a>
		{/if}
	</div>
</PageContainer>

<style>
	.listing {
		background: var(--bg-primary);
	}

	.button {
		display: grid;
		place-items: center;
		height: 53px;
		font-weight: 500;

		&:hover {
			background: var(--tap-sm);
		}
	}
	.latest-button {
		border-bottom: 1px solid var(--divider-sm);
	}
	.more-button {
		border-top: 1px solid var(--divider-sm);
	}

	.descendants {
		padding: 4px 0;
	}
</style>
