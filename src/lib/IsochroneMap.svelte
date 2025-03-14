<script>
	// Components
	import Isochrone from '$lib/Isochrone.svelte';
	import PercentBar from '$lib/PercentBar.svelte';
	import Legend from '$lib/Legend.svelte';
	import LegendHTML from '$lib/LegendHTML.svelte';

	// Functions
	import { draw } from 'svelte/transition';
	import { geoAlbers, geoPath } from 'd3-geo';
	import { union, sort, descending } from 'd3-array';
	import { scaleOrdinal } from 'd3-scale';

	// Data
	import tracts from '$lib/nhgis_la_subset.geojson.json';
	import laOutline from '$lib/nhgis_la_outline.geojson.json';
	import isochrones from '$lib/isochronesTransit2025.geojson.json';
	import metroRoutes from '$lib/metroRoutes.geojson.json';
	import metroLinkRoutes from '$lib/metroLinkRoutes.geojson.json';

	// Props
	let { 
		venue,
		isochronesFiltered
	 } = $props();

	//$inspect(venue.venue)
	//let tractPop = isochrones.features.map((d) => d.properties.pop).reduce((a, b) => a + b, 0);
	//let venueIsos = isochrones.features.map((d) => d.properties.includes(venue))
	// Filter isochrones by venue and travel time + rewind to fix polygons
	let isochronesSorted = $derived(
		sort(isochronesFiltered, (a, b) =>
			descending(a.properties.travel_time, b.properties.travel_time)
		)
	);
	
	let venuePop = $derived(
		isochronesFiltered.filter(
			(d) => d.properties.venue_simplified == venue.venue_simplified && d.properties.travel_time === 7200
		)
	);
	let venuePopPercent = $derived(
		(venuePop[0].properties.pop / 9301156).toLocaleString('en-US', {
			style: 'percent',
			minimumFractionDigits: 1
		})
	);

	let width = $state(600);
	let height = $derived(width * 0.75);

	// Margins around the chart to position it properly inside the SVG container
	const margin = { top: 25, right: 25, bottom: 25, left: 25 };

	// Mapping projection
	let projection = $derived(
		geoAlbers()
			.rotate([118, 0])
			.rotate([118, 0])
			//.center([-0.35, 34.2])
			.fitSize([width - margin.left - margin.right, height - margin.top - margin.bottom], tracts)
		//.scale(width * 55)
		//.translate([width / 2, height / 2])
		//.fitWidth(width - margin.left - margin.right, tracts)
	);

	let path = $derived(geoPath().projection(projection));

	// Get unique travel times
	const travelTimes = $derived(union(isochronesFiltered.map((d) => d.properties.travel_time)));

	let travelTimeCategories = {
		1800: '< 30',
		3600: '30-60',
		5400: '60-90',
		7200: '90-120',
		9000: '> 120'
	};

	// Colour scale
	const colour = $derived(
		scaleOrdinal().domain(travelTimes).range(['green', 'yellow', 'orange', 'red', 'black'])
	);

	// Show transit lines value and function
	let showTransit = $state(false);

	function handleTransitClick() {
		showTransit = !showTransit;
	}
	let [x, y] = $derived(
		projection([venue.venue_geometry.coordinates[0], venue.venue_geometry.coordinates[1]])
	);
</script>

<div class="chart-container" bind:clientWidth={width}>
	<h3>Events: {venue.events}</h3>
	<h2>{venuePopPercent} of residents live within 2 hrs of the venue by public transit</h2>

	<svg {width} {height} class="svg-container">
		<!-- svelte-ignore a11y_click_events_have_key_events --->

		<g>
			<!-- Census Tracts -->
			<path d={path(tracts)} fill="white" stroke="#333" stroke-opacity=".4" />
			<!-- Isochrones -->
			{#key isochronesSorted}
				<Isochrone
					isochroneData={isochronesSorted}
					{path}
					colourScale={colour}
					venue={venue.venue_simplified}
				/>
			{/key}

			<!-- Transit lines -->
			{#if showTransit}
				<g>
					{#each metroRoutes.features as route}
						<path
							transition:draw|global={{ duration: 800 }}
							d={path(route.geometry)}
							stroke={route.properties.route_color}
							fill="none"
							stroke-width="3"
						/>
					{/each}
					{#each metroLinkRoutes.features as route}
						<path
							transition:draw|global={{ delay: 400, duration: 800 }}
							d={path(route.geometry)}
							stroke={route.properties.route.route_color}
							fill="none"
							stroke-width="2"
						/>
					{/each}
				</g>
			{/if}
			<circle cx={x} cy={y} r="6" stroke="white" stroke-width="2" />
		</g>

		<!-- Legend -->
		<g transform={`translate(${margin.left}, ${height - margin.top})`}>
			{#each travelTimes as time, i}
				<g transform={`translate(${margin.left + (i * width) / 4}, -4)`}>
					<!-- Color box -->
					<rect
						style="border-radius:10px;"
						width="16"
						height="16"
						rx="4"
						ry="4"
						fill={colour(time)}
					/>
					<!-- Category text -->
					<text class="fill-gray-800" x="20" y="10" font-size="14px" alignment-baseline="middle"
						>{travelTimeCategories[time]} mins</text
					>
				</g>
			{/each}
		</g>
	</svg>
	<button onclick={handleTransitClick}
		>{#if showTransit}Hide{:else}Show{/if} Transit</button
	>
	<PercentBar data={isochronesFiltered} />
</div>
<hr />

<style>
	.chart-container {
		position: relative;
		width: 100%;
		margin-bottom: 1rem;
	}

	.svg-container {
	}

	.chart-container h1 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.chart-container h2 {
		font-size: 1.1rem;
	}

	.chart-container h3 {
		font-size: 1rem;
	}

	button {
		padding: 4px 8px;
		color: rgb(80, 80, 80);
		font-size: 0.9rem;
		opacity: 0.9;
		text-decoration: underline;
	}
</style>
