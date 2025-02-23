<script lang="ts">
	import type { AppBskyGraphDefs, AppBskyGraphStarterpack } from '@atcute/client/lexicons';

	import { PUBLIC_APP_NAME, PUBLIC_APP_URL } from '$env/static/public';

	import { parseAtUri } from '$lib/types/at-uri';

	interface Props {
		pack: AppBskyGraphDefs.StarterPackView;
	}

	const { pack }: Props = $props();

	const uri = $derived(parseAtUri(pack.uri));
	const record = $derived(pack.record as AppBskyGraphStarterpack.Record);

	const description = $derived.by(() => {
		const desc = record.description?.trim();

		let str = '';

		str += `Starter pack by @${pack.creator.handle}`;

		if (desc) {
			str += `\n\n${desc}`;
		}

		return str;
	});
</script>

<svelte:head>
	<meta property="og:site_name" content={PUBLIC_APP_NAME} />
	<meta property="twitter:card" content="summary" />
	<meta property="og:url" content="{PUBLIC_APP_URL}/{uri.repo}/packs/{uri.rkey}" />
	<meta property="og:title" content={record.name.trim()} />
	<meta property="og:description" content={description} />
</svelte:head>
