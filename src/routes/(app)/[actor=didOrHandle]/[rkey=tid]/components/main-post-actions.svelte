<script lang="ts">
	import type { AppBskyFeedDefs } from '@atcute/client/lexicons';

	import { parseAtUri } from '$lib/types/at-uri';

	import DotGrid_1x3HorizontalOutlined from '$lib/components/central-icons/dot-grid-1x3-horizontal-outlined.svelte';
	import SquareArrowTopRightOutlined from '$lib/components/central-icons/square-arrow-top-right-outlined.svelte';

	interface Props {
		post: AppBskyFeedDefs.PostView;
	}

	const { post }: Props = $props();

	const id = $props.id();
</script>

<button class="button" title="More actions" popovertarget={id} style="anchor-name: --{id}">
	<DotGrid_1x3HorizontalOutlined />
</button>

<dialog class="menu" {id} popover="auto" style="position-anchor: --{id}">
	<a
		class="item"
		href="https://bsky.app/profile/{post.author.did}/post/{parseAtUri(post.uri).rkey}"
		rel="noopener nofollow"
	>
		<SquareArrowTopRightOutlined />
		<span>Open in Bluesky app</span>
	</a>

	<a class="item" href="https://pdsls.dev/{post.uri}" rel="noopener nofollow">
		<SquareArrowTopRightOutlined />
		<span>Open in PDSls</span>
	</a>
</dialog>

<style>
	.button {
		display: grid;
		place-items: center;
		appearance: none;
		cursor: pointer;
		margin: 0 -4px;
		border: none;
		border-radius: 9999px;
		background: transparent;
		width: 32px;
		height: 32px;
		color: var(--text-primary);
		font-size: 16px;

		&:hover {
			background: var(--tap-md);
		}
	}

	.menu {
		margin: 16px;
		box-shadow:
			0 20px 25px -5px rgb(0 0 0 / 0.25),
			0 8px 10px -6px rgb(0 0 0 / 0.25);
		border: 1px solid var(--divider-md);
		border-radius: 4px;
		background: var(--bg-primary);
		width: max-content;
		max-width: min(384px, calc(100dvw - 16px * 2));
		max-height: 55dvh;
		color: var(--text-primary);

		@supports not (position-anchor: auto) {
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
		@supports (position-anchor: auto) {
			top: calc(anchor(bottom) - 12px);
			bottom: unset;
			justify-self: anchor-center;
			position-try: flip-block;
		}
	}

	.item {
		display: flex;
		gap: 12px;
		padding: 12px 16px;
		color: var(--text-primary);
		font-weight: 600;

		& > :global(.sv-icon) {
			margin: 1px 0 0 0;
			font-size: 18px;
		}

		&:hover {
			background: var(--tap-sm);
		}
	}
</style>
