<script>
	// This awesome component is from: https://datavisualizationwithsvelte.com/basics/stacked-bar-chart
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { sort, descending, max, min, groupSort } from 'd3-array';
	//import AxisLeft from '$lib/AxisLeftV5.svelte';

	let {
		title = 'How much of LA can get to the venues by Public Transit?',
		subtitle = '% of Los Angeles population who can reach a venue within the travel time',
		labelCategories = ['< 30', '< 60', '< 90', '< 120'],
		categories = [1800, 3600, 5400, 7200],
		colours = ['#ffffd4','#fed98e','#fe9929','#cc4c02'],
		data = [
			{
				Venue: 'Arena Downtown',
				1800: 0.1,
				3600: 0.2,
				5400: 0.76,
				7200: 0.99
			},
			{
				Venue: 'Arena Long Beach',
				1800: 0.05,
				3600: 0.1,
				5400: 0.54,
				7200: 0.85
			}
		]
	} = $props();

	let dataSorted = $derived(
		sort(data, (a, b) =>
			descending(a.properties.travel_time, b.properties.travel_time)
		)
	);

	const colors = ['#0072BC', '#F56901', '#ADA8BE', '#0C1B33'];

	let width = $state(480);
	const height = 480;
	const margin = { top: 40, right: 30, bottom: 30, left: 276 };

	//const categories = ['Rail', 'Bus', 'Walk', 'Car'];
	// Scales

	let travelTimeCategories = {
		1800: '< 30',
		3600: '< 60',
		5400: '< 90',
		7200: '< 120',
	};

	let innerWidth = $derived(width - margin.left - margin.right);

	let xScale = $derived(
		scaleLinear()
			.domain([
				0, 1
				//max(data, (d) => categories.reduce((sum, key) => sum + d[key], 0))
			])
			.nice()
			.range([0, innerWidth])
	);
	//$inspect(data);

	const yScale = $derived(
		scaleBand()
			//.domain(data.map((d) => d.properties['venue']))
			.domain(groupSort(data, (D) => max(D, (d) => d.properties.pop_pct), (d) => d.properties.venue_simplified))
			.range([height - margin.bottom, margin.top])
			.padding(0.25)
	);

	const colour = scaleOrdinal()
		.domain(labelCategories)
		.range(colours);

	// Stack data
	//const stackGenerator = stack().keys(categories).order(stackOrderNone);
	//const stackedData = stackGenerator(data);

	// Compute total values for each bar
	/*const totalValues = data.map((d) =>
    categories.reduce((sum, key) => sum + d[key], 0)
  );*/

	function getVenueData(data, venue, travelTime = 1800) {
		let dataFiltered = dataSorted.filter(
			(d) => d.properties.venue_simplified == venue && d.properties.travel_time === travelTime
		);
		// Problem: dataFiltered is an array of Objects
		//console.log(dataFiltered[0].properties.pop_pct)
		return dataFiltered[0].properties.pop_pct;
	}
	//console.log(getVenueData(data, 'Arena Downtown'))
	let regexToMatch = /(?<=\()([A-z\s]+)/g;

	// 1. Venue, then  time category

	// 2. Time Category, then venue?
</script>

<div
	class=" p relative box-border min-w-full rounded-xl border-gray-100 p-4 pt-0"
	bind:clientWidth={width}
>
	<div class="flex w-full items-center justify-between pt-1 font-semibold text-gray-600">
		<h3 class="">{title}</h3>
	</div>
	<div class="flex w-full items-center justify-between pt-0 pb-2 text-gray-500 text-base">
		<h4 class="">{subtitle}</h4>
	</div>
	<svg {width} {height} class="border-t-[1px] border-gray-200 fill-emerald-300">
		<!-- Legend -->
		<g transform={`translate(0,${margin.top/2})`}>
			{#each Object.keys(travelTimeCategories) as time, i}
				{console.log(time, i)}
				<g transform={`translate(${margin.left+(i * (width-margin.left)) / 4}, -4)`}>
					<!-- Color box -->
					<rect
						style="border-radius:10px;"
						width="16"
						height="16"
						rx="4"
						ry="4"
						fill={colour(travelTimeCategories[time])}
						opacity=.85
					/>
					<!-- Category text -->
					<text class="fill-gray-800 font-sans" x="20" y="10" font-size="12px" dominant-baseline="middle"
						>{travelTimeCategories[time]} mins</text
					>
				</g>
			{/each}
		</g>
		<!-- X-axis -->
		<g transform={`translate(${margin.left}, ${height - margin.bottom})`}>
			<!-- yScale.domain() is an array with two elements min and max values 
      from the data, so we can use it to create the start and end point
      of our axis line -->
			<line stroke="currentColor" x1={xScale(0)} x2={xScale(1)} />
			<!-- Specify the number of ticks here -->
			{#each xScale.ticks(5) as tick}
					<line stroke="currentColor" y1={0} y2={6} x1={xScale(tick)} x2={xScale(tick)} />

				<text  class="font-sans"
					fill="currentColor"
					text-anchor={tick < 1 ? (tick === 0 ? "start" : "middle") : "end"}
					font-size="12"
					dominant-baseline="middle"
					y={16}
					x={xScale(tick)}
				>
					{tick.toLocaleString('en-US', {
						style: 'percent',
						minimumFractionDigits: 0
					})}
				</text>
			{/each}
			
		</g>

		<!-- Y-axis labels -->
		<g transform="translate({margin.left},0)">
			{#each yScale.domain() as venue}
				<text  class="font-sans"
					fill="currentColor"
					y={yScale(venue) + yScale.bandwidth() / 2}
					x={-10}
					font-size="14px"
					dominant-baseline="middle"
					text-anchor="end"
				>
					{venue.match(regexToMatch) === null ? venue : venue.match(regexToMatch)}
				</text>
			{/each}
		</g>
		<!-- Bars -->
		<g transform="translate({margin.left},0)">
			{#each yScale.domain() as venue}
				<rect
					x={xScale(0)}
					y={yScale(venue)}
					height={yScale.bandwidth()}
					width={xScale(1)}
					fill="lightgrey"
					rx="3"
					ry="3"
					opacity=.7
				/>
				{#each categories.reverse() as time}
					<rect
						x={xScale(0)}
						y={yScale(venue)}
						height={yScale.bandwidth()}
						width={xScale(getVenueData(dataSorted, venue, time))}
						fill={colour(travelTimeCategories[time])}
						stroke="black"
						stroke-width=".25"
						opacity=.9
					/>
					<!-- Text labels for bars >2% -->
					 <!-- ISSUE:  -->
					{#if getVenueData(data, venue, time) > .025}
					<text class="font-sans"
						x={xScale(getVenueData(data, venue, time))}
						y={yScale(venue) + yScale.bandwidth() / 2}
						fill={time === 1800 && getVenueData(data, venue, time) > 0.04 ? "black" : "currentColor"}
						font-size="11px"
						dominant-baseline="middle"
						text-anchor={getVenueData(data, venue, time) < 0.04 && time === 1800 ? "start" : "end"}
						dx={getVenueData(data, venue, time) < 0.04 ? "4" : "-2"}
						dy="1"
					>
						{getVenueData(data, venue, time).toLocaleString('en-US', {
							style: 'percent',
							minimumFractionDigits: 0
						})}
					</text>
					{/if}
				{/each}
			{/each}
		</g>
	</svg>
</div>
