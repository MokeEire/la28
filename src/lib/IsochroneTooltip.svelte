<script lang="ts">
	import { fly } from 'svelte/transition';
	let { data, m } = $props();

	$inspect(data)
</script>

{#if data?.properties.venue_simplified}
	<div style="position: absolute; top: {m.y}px; left: {m.x}px" >
		<h2>{data.properties.venue_simplified}</h2>
		<h3>
			Within {data.properties.travel_time_mins} minutes, {data.properties.pop_pct.toLocaleString(
				'en-US',
				{
					style: 'percent',
					minimumFractionDigits: 1
				}
			)} of Angelenos can reach the venue by public transit
		</h3>
	</div>
{/if}

<style>
	div {
		text-align: left;
		background-color: #ffffff;
		padding: 8px 6px;
	}

	h2 {
		font-size: 1.2rem;
		font-weight: 700;
		margin-bottom: 0.1rem;
	}

	h3 {
		font-size: .8rem;
		font-weight: 200;
	}
</style>
