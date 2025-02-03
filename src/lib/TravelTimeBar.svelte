<script>
	// This awesome component is from: https://datavisualizationwithsvelte.com/basics/stacked-bar-chart
	import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale';
	import { stack, stackOrderNone } from 'd3-shape';
	import { max } from 'd3-array';
	//import AxisLeft from '$lib/AxisLeftV5.svelte';

	let {
		title = 'Car or Transit? How much time do you have?',
		labelCategories = ['< 30', '30-60', '60-90', '90-120'],
		categories = [1800, 3600, 5400, 7200],
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

	const colors = ['#0072BC', '#F56901', '#ADA8BE', '#0C1B33'];

	let width = $state(480);
	const height = 480;
	const margin = { top: 30, right: 30, bottom: 30, left: 64 };

	//const categories = ['Rail', 'Bus', 'Walk', 'Car'];
	// Scales

  let travelTimeCategories = {
		1800: '< 30',
		3600: '30-60',
		5400: '60-90',
		7200: '90-120',
		9000: '> 120'
	};

	let xScale = $derived(
		scaleLinear()
			.domain([
				0, 1
				//max(data, (d) => categories.reduce((sum, key) => sum + d[key], 0))
			])
			.nice()
			.range([margin.left, width - margin.right - margin.left])
	);

	const yScale = $derived(
    scaleBand()
		.domain(data.map((d) => d.properties['venue']))
		.range([height - margin.bottom, margin.top])
		.padding(0.25)
  );

	const colour = scaleOrdinal()
		.domain(labelCategories)
		.range(['green', 'yellow', 'orange', 'red', 'black']);

	// Stack data
	const stackGenerator = stack().keys(categories).order(stackOrderNone);
	//const stackedData = stackGenerator(data);

	// Compute total values for each bar
	/*const totalValues = data.map((d) =>
    categories.reduce((sum, key) => sum + d[key], 0)
  );*/

	function getVenueData(data, venue, travelTime = 1800) {
		let dataFiltered = data.filter(
			(d) => d.properties.venue == venue && d.properties.travel_time === travelTime
		);
		// Problem: dataFiltered is an array of Objects
		//console.log(dataFiltered[0].properties.pop_pct)
		return dataFiltered[0].properties.pop_pct;
	}
	//console.log(getVenueData(data, 'Arena Downtown'))

	// 1. Venue, then  time category

	// 2. Time Category, then venue?
</script>

<div
	class=" p relative box-border min-w-full rounded-xl border-gray-100 p-4 pt-0"
	bind:clientWidth={width}
>
	<div class="flex w-full items-center justify-between pb-4 pt-1 font-semibold text-gray-600">
		<h3 class="">{title}</h3>
	</div>
	<svg
		width={width - margin.left - margin.right}
		{height}
		class="border-t-[1px] border-gray-200 fill-emerald-300"
	>
		

		<!-- X-axis -->
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
				<line
					class="stroke-gray-300"
					stroke-dasharray="6,6"
					y1={margin.left + 10}
					y2={height - margin.bottom - margin.top}
					x1={xScale(tick)}
					x2={xScale(tick)}
				/>
			{/each}
		</g>

		<!-- <AxisLeft {width} {height} {margin} {yScale} ticksNumber={5} /> -->
		<!-- Bars and Total Values 
    {#each stackedData as series, i}
      {#each series as [x0, x1], j}
        {console.log(data[j])}
        <rect
          rx="3"
          ry="3"
          y={yScale(data[j]['Venue'])}
          x={xScale(x0)}
          height={yScale.bandwidth()}
          width={xScale(x1) - xScale(x0)}
          fill={colour(labelCategories[i])} />
          {#if (x1-x0) > 0}
          <text
          fill="white"
          text-anchor="end"
          font-size="12"
          dominant-baseline="middle"
          y={yScale(data[j]['Venue'])+yScale.bandwidth()/2}
          x={xScale((x0+x1)/2)}>
          {labelCategories[i]}
        </text>
          {/if}
      {/each}
    {/each}-->

		<!-- Y-axis labels -->
		<g transform="translate({margin.left},0)">
			{#each yScale.domain() as period}
				<text
					fill="currentColor"
					y={yScale(period) + yScale.bandwidth() / 2}
					x="-{margin.left}"
					font-size="14px"
					dominant-baseline="middle"
					text-anchor="start"
				>
					{period}
				</text>
			{/each}
		</g>
		<g transform={`translate(0, ${height - 20})`}>
			<!-- yScale.domain() is an array with two elements min and max values 
      from the data, so we can use it to create the start and end point
      of our axis line -->
			<line stroke="currentColor" x1={xScale(0)} x2={xScale(xScale.domain()[1])} />
			<!-- Specify the number of ticks here -->
			{#each xScale.ticks(5) as tick}
				{#if tick !== 0}
					<line stroke="currentColor" y1={0} y2={6} x1={xScale(tick)} x2={xScale(tick)} />
				{/if}

				<text
					fill="currentColor"
					text-anchor="start"
					font-size="12"
					dominant-baseline="middle"
					y={12}
					x={xScale(tick)}
				>
					{tick}
				</text>
			{/each}
			<text
				fill="currentColor"
				text-anchor="start"
				font-size="12"
				dominant-baseline="middle"
				y={12}
				x={xScale(width)}
			>
				Mins
			</text>
		</g>

    {#each yScale.domain() as venue}
			<rect
				x={xScale(0)}
				y={yScale(venue)}
				height={yScale.bandwidth()}
				width={xScale(1)}
				fill="lightgrey"
				rx="3"
				ry="3"
			/>
			{#each categories.reverse() as time}
				<rect
					x={xScale(0)}
					y={yScale(venue)}
					height={yScale.bandwidth()}
					width={xScale(getVenueData(data, venue, time))}
					fill={colour(travelTimeCategories[time])}
				/>
        <text
					x={xScale(getVenueData(data, venue, time))}
					y={yScale(venue)+yScale.bandwidth()/2}
          fill="white"
          font-size='10px'
					alignment-baseline="middle">
          {getVenueData(data, venue, time).toLocaleString('en-US', {
            style: 'percent',
            minimumFractionDigits: 1
          })}
				</text>
			{/each}
		{/each}
	</svg>
</div>
