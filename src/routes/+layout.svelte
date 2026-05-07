<script lang="ts">
	import type { LayoutProps } from './$types';

	import FeedAside from './components/feed-aside.svelte';

	const { data, children }: LayoutProps = $props();
</script>

{#key data.feed.uri}
	<div class="custom-feed-layout">
		{#if false}
			<div class="aside">
				<FeedAside feed={data.feed} />
			</div>
		{/if}

		<div class="main">
			<div class="header">
				<h1>VanHex News Hub Experiment #1</h1>
				<a href="https://github.com/hexcamp/vanhex-newshub-1">Source on GitHub</a>
				- <a href="https://6kg6rqiaaaaa.vanhex.ca/">Other Experiments</a>
			</div>
			{@render children()}
		</div>
		<div class="publisherFrame">
			<h1>Publisher</h1>
			<iframe name="publisherFrame" src="about:blank" title="publisher"></iframe>
		</div>
	</div>
{/key}

<style>
	.custom-feed-layout {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		/* grid-template-areas: 'aside' 'main'; */
		grid-template-areas: 'main' 'publisher';
		justify-content: center;
		gap: 8px;
		margin: 24px auto 0;
		max-width: 1200px;

		@media (width >= 640px) {
			/* grid-template-columns: minmax(255px, 320px) minmax(0, 600px); */
			/* grid-template-areas: 'aside main'; */

			/*
			grid-template-columns: minmax(0, 600px);
			grid-template-areas: 'main';
			*/

			/* grid-template-columns: minmax(0, 600px); */
			grid-template-columns: minmax(255px, 320px) minmax(0, 1200px);
			grid-template-areas: 'main publisher';

			max-width: 960px;
		}
	}

	.aside {
		display: flex;
		grid-area: aside;
		flex-direction: column;
		gap: 8px;

		@media (width >= 640px) {
			position: sticky;
			top: 0;
			max-height: 100dvh;
			overflow-y: auto;
		}
	}

	.main {
		grid-area: main;
		padding-bottom: 24px;
	}

	.header {
		padding-bottom: 24px;
	}

	.header h1 {
		margin-bottom: 0.5rem;
	}

	.publisherFrame {
		grid-area: publisher;
	}

	.publisherFrame iframe {
		width: 100%;
		height: 100%;
	}
</style>
