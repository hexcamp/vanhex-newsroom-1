<script lang="ts">
	import { dev } from '$app/environment';
	import { base } from '$app/paths';

	import { formatLongDate, formatRelativeTime, formatShortDate, formatTime } from '$lib/utils/intl/date';
	import { assertNever } from '$lib/utils/invariant';

	import Island from '../island.svelte';

	interface Props {
		date: Date | string | number;
		format: 'short-date' | 'long-date' | 'time' | 'relative-time';
	}

	const { date: rawDate, format }: Props = $props();

	const date = $derived(new Date(rawDate));

	const formatted = $derived.by((): { label: string; alt?: string } => {
		const long = formatLongDate(date);

		switch (format) {
			case 'short-date': {
				return { label: formatShortDate(date), alt: long };
			}
			case 'long-date': {
				return { label: long };
			}
			case 'time': {
				return { label: formatTime(date), alt: long };
			}
			case 'relative-time': {
				return { label: formatRelativeTime(date), alt: long };
			}
			default: {
				assertNever(format);
			}
		}
	});
</script>

{#if dev}
	<time title={formatted.alt} datetime={date.toISOString()} data-format={format}>
		{formatted.label}
	</time>
{:else}
	<Island scriptUrl="{base}/_scripts/time-formatter.js" fetchPriority="low">
		<time title={formatted.alt} datetime={date.toISOString()} data-format={format}>
			{formatted.label}
		</time>
	</Island>
{/if}
