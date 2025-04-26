<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children?: Snippet;
	}

	const { title, children }: Props = $props();
</script>

<div class="page-header">
	<h2 class="title">{title}</h2>

	{#if children}
		<div class="actions">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.page-header {
		display: flex;
		position: sticky;
		top: 0;
		justify-content: space-between;
		align-items: center;
		z-index: 1;
		border-bottom: 1px solid var(--divider-sm);
		background: var(--bg-primary);
		padding: 12px 16px;
	}

	.title {
		font-weight: 600;
		font-size: 1rem;
		line-height: 1.5rem;
	}

	.actions {
		display: flex;
		align-items: center;
		gap: 4px;
	}
</style>
