<script>
	// This awesome component is from: https://datavisualizationwithsvelte.com/basics/stacked-bar-chart
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { stack, stackOrderNone } from 'd3-shape';
	import { union } from 'd3-array';
	import { slide } from 'svelte/transition';
	import { cubicInOut, cubicOut, linear } from 'svelte/easing';
	//import AxisLeft from '$lib/AxisLeftV5.svelte';

	let {
		data,
    travelTimeCategories,
	colours
	} = $props();


	let width = $state(480);
	const height = 48;
	const margin = { top: 8, right: 20, bottom: 24, left: 10 };

  let categories = Object.keys(travelTimeCategories);
	let labelCategories = Object.values(travelTimeCategories);
	// Scales

	// Transform the data
	function transformVenueData(d) {
		// Get the venue name from the first feature (since they're all the same venue)
		let venueName = d[0].properties.venue;

		// Initialize the venue data object
		let venueData = { venue: venueName };

		// Add travel time data
		d.forEach((feature) => {
			// Use travel_time_mins as key and pop_pct as value
			//console.log(feature.properties.travel_time, ':', feature.properties.pop_pct)
			venueData[travelTimeCategories[feature.properties.travel_time]] = feature.properties.pop_pct;
		});

		return [venueData];
	}

	let transformedVenueData = $derived(data.length ? transformVenueData(data) : null);


	// Get unique travel times
	const travelTimes = $derived(union(data.map((d) => d.properties.travel_time)));

	// Colour scale
	const colour = scaleOrdinal()
		.domain(labelCategories)
		.range(colours);
	let xScale = $derived(
		scaleLinear()
			.domain([0, 1])
			.nice()
			.range([margin.left, width - margin.right - margin.left])
	);

	let yScale = $derived(
		scaleBand()
			.domain(transformedVenueData.map((d) => d['venue']))
			.range([height - margin.bottom, margin.top])
			.padding(0.25)
	);

	// Stack data
	//const stackGenerator = stack().keys(labelCategories).order(stackOrderNone);
	//const stackedData = $derived(stackGenerator(transformedVenueData));

	//$inspect(stackedData);
</script>

<div
	class=" p relative box-border min-w-full rounded-xl border-gray-100 p-4 pt-0"
	bind:clientWidth={width}
>
	<svg
		width={width - margin.left - margin.right}
		{height}
		class="fill-emerald-300"
	>
		<!-- <AxisLeft {width} {height} {margin} {yScale} ticksNumber={5} /> -->
		<!-- Bars and Total Values -->
		<rect
			x={xScale(0)}
			y={yScale(transformedVenueData[0]['venue'])}
			height={yScale.bandwidth()}
			width={xScale(1)}
			fill="lightgrey"
			rx="3"
			ry="3"
		/>
		{#each Object.entries(travelTimeCategories).reverse() as [time, category] (time)}
			<rect
				in:slide|global={{
					duration: 20 * (time / 60),
					axis: 'x',
					easing: cubicInOut
				}}
				x={xScale(0)}
				y={yScale(transformedVenueData[0]['venue'])}
				height={yScale.bandwidth()}
				width={xScale(transformedVenueData[0][category])}
				fill={colour(category)}
				rx="3"
				ry="3"
			/>
		{/each}

		<!-- Y-axis -->
		<g>
			{#each xScale.ticks(5) as tick}
				<text
					y={margin.left - 10}
					x={xScale(tick)}
					font-size="10px"
					text-anchor="end"
					alignment-baseline="middle"
				>
					<!-- {tick} -->
				</text>
			{/each}
		</g>
		<!-- X-axis labels -->
		<g transform={`translate(0, ${height - margin.bottom - margin.top})`}>
			{#each [0, 0.2, 0.4, 0.6, 0.8, 1] as percent}
				<text
					fill="black"
					x={xScale(percent)}
					y={margin.bottom}
					font-size="14px"
					text-anchor={percent < 1 ? 'middle' : 'end'}
				>
					{percent.toLocaleString('en-US', {
						style: 'percent',
						minimumFractionDigits: 0
					})}
				</text>
				<line stroke="black" y1={4} y2={12} x1={xScale(percent)} x2={xScale(percent)} />
			{/each}
		</g>
	</svg>
</div>
