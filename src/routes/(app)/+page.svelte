<script lang="ts">
	import { base } from '$app/paths';

	import CircleInfoOutlined from '$lib/components/central-icons/circle-info-outlined.svelte';
	import CompassRoundOutlined from '$lib/components/central-icons/compass-round-outlined.svelte';
	import MagnifyingGlassOutlined from '$lib/components/central-icons/magnifying-glass-outlined.svelte';
	import Trending_2Outlined from '$lib/components/central-icons/trending-2-outlined.svelte';
</script>

<div class="wrapper">
	<div class="container">
		<form method="get" action="{base}/search" class="search-box">
			<input type="search" name="q" placeholder="Search for keywords, @usernames, or #tags" class="input" />

			<button aria-label="Search" type="submit" class="button">
				<MagnifyingGlassOutlined />
			</button>
		</form>

		<div class="links">
			<a href="{base}/trending" class="link">
				<Trending_2Outlined />
				<span>Trending</span>
			</a>

			<a href="{base}/did:plc:z72i7hdynmk6r22z27h6tvur/feeds/whats-hot" class="link">
				<CompassRoundOutlined />
				<span>Discover</span>
			</a>
		</div>
	</div>
</div>

<style>
	.wrapper {
		display: grid;
		place-items: center;
		min-height: 100dvh;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 0 auto;
		background: var(--bg-primary);
		padding: 16px;
		width: 100%;
		max-width: 600px;
	}

	.search-box {
		display: flex;
		position: relative;
	}
	.input {
		flex-grow: 1;
		appearance: none;
		border: 1px solid var(--divider-sm);
		background: transparent;
		padding: 10px 36px 10px 12px;
		color: inherit;

		&::placeholder {
			color: var(--text-blurb);
			font-style: italic;
		}

		&:focus {
			outline-offset: -1px;
		}
	}
	.button {
		display: grid;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		flex-shrink: 0;
		place-items: center;
		appearance: none;
		cursor: pointer;
		margin: 1px;
		border: 0;
		background: transparent;
		aspect-ratio: 1 / 1;
		color: color-mix(in srgb, var(--text-primary), transparent 10%);
		font-size: 1.125rem;

		&:hover {
			background: var(--tap-sm-pressed);
		}
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 12px;
	}

	.link {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		color: color-mix(in srgb, var(--text-primary), transparent 10%);

		:global(.sv-icon) {
			font-size: 16px;
		}

		&:hover {
			background: var(--tap-sm-pressed);
			color: var(--text-primary);
		}
	}
</style>
