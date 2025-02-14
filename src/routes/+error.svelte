<script lang="ts">
	import { page } from '$app/state';

	import PageContainer from '$lib/components/page/page-container.svelte';

	import '$lib/styles/app.css';
</script>

<PageContainer>
	<div class="error-page">
		<h1 class="title">Error {page.status}</h1>
		<p class="description">
			{page.error?.message}
		</p>
	</div>
</PageContainer>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		gap: 16px;
		background: var(--bg-primary);
		padding: 24px;
	}

	.title {
		font-size: 1.25rem;
		line-height: 1.75rem;
	}
	.description {
		font-size: 1rem;
		line-height: 1.5rem;
	}
</style>
