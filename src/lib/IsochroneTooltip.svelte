<script lang="ts">
	import { fly } from 'svelte/transition';
	let { data, isochroneTooltipPosition } = $props();

	$inspect(data)
</script>

{#if data?.properties.venue_simplified}
	<div class="tooltip" style="position: fixed; left: {isochroneTooltipPosition.x + 10}px; top: {isochroneTooltipPosition.y + 10}px;">
		<h1>{data.properties.venue_simplified}</h1>
		<h2>
			Within {data.properties.travel_time_mins} minutes, {data.properties.pop_pct.toLocaleString(
				'en-US',
				{
					style: 'percent',
					minimumFractionDigits: 1
				}
			)} of Angelenos can reach the venue by public transit
		</h2>
	</div>
{/if}

<style>
	.tooltip {
		padding: 8px 12px;
		text-align: left;
		background: white;
		box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
		border-radius: 3px;
		pointer-events: none;
		transition: top 300ms ease, left 300ms ease;
	}

	h1 {
		font-size: 1rem;
		font-weight: 500;
		margin: 0 0 4px 0;
	}

	h2 {
		font-size: 0.8rem;
		font-weight: 400;
		margin: 0;
		color: #666;
	}
</style>
