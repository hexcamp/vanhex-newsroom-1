<script lang="ts">
	import type { PageProps } from './$types';

	import PageContainer from '$lib/components/page/page-container.svelte';
	import PostFeedItem from '$lib/components/timeline/post-feed-item.svelte';

	const { data }: PageProps = $props();
</script>

<PageContainer>
	<div class="unroll-page">
		{#each data.posts as post, idx (post.uri)}
			<PostFeedItem
				item={{
					id: post.uri,
					post,
					reply: undefined,
					reason: undefined,
					next: idx !== data.posts.length - 1,
					prev: idx !== 0,
				}}
			/>
		{/each}
	</div>
</PageContainer>

<style>
	.unroll-page {
		background: var(--bg-primary);
	}
</style>
