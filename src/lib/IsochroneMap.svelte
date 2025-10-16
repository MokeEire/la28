<script>
	// Components
	//import Isochrone from '$lib/Isochrone.svelte';
	import PercentBar from '$lib/PercentBar.svelte';
	//import Legend from '$lib/Legend.svelte';
	import LegendHTML from '$lib/LegendHTML.svelte';
	import RouteTooltip from '$lib/RouteTooltip.svelte';
	import VenueTooltip from '$lib/VenueTooltip.svelte';
	import IsochroneTooltip from '$lib/IsochroneTooltip.svelte';

	// Functions
	import { draw, fade } from 'svelte/transition';
	import { quadOut } from 'svelte/easing';
	import { geoAlbers, geoPath } from 'd3-geo';
	import { union, sort, descending } from 'd3-array';
	import { scaleOrdinal } from 'd3-scale';

	// Data
	import tracts from '$lib/nhgis_la_subset.geojson.json';
	//import laOutline from '$lib/nhgis_la_outline.geojson.json';
	//import isochrones from '$lib/isochronesTransit2025.geojson.json';
	import metroRoutes from '$lib/metroRoutes.geojson.json';
	import metroLinkRoutes from '$lib/metroLinkRoutes.geojson.json';

	// Props
	let {
		venues,
		isochronesRewind,
		colours = ['#ffffd4', '#fed98e', '#fe9929', '#cc4c02']
	} = $props();

	let venueSelected = $state(venues[12]);

	//$inspect(venue.venue)
	//let tractPop = isochrones.features.map((d) => d.properties.pop).reduce((a, b) => a + b, 0);
	//let venueIsos = isochrones.features.map((d) => d.properties.includes(venue))
	// Filter isochrones by venue and travel time + rewind to fix polygons
	let isochronesFiltered = $derived(
		isochronesRewind.features.filter(
			(d) =>
				d.properties.venue == venueSelected.venue &&
				d.properties.travel_time <= 60 * 120
		)
	);
	
	let isochronesSorted = $derived(
		sort(isochronesFiltered, (a, b) =>
			descending(a.properties.travel_time, b.properties.travel_time)
		)
	);

	let venuePop = $derived(
		isochronesFiltered.filter(
			(d) =>
				d.properties.venue == venueSelected.venue &&
				d.properties.travel_time === 7200
		)
	);
	let venuePopPercent = $derived(
		(venuePop[0].properties.pop / 9301156).toLocaleString('en-US', {
			style: 'percent',
			minimumFractionDigits: 1
		})
	);

	let width = $state(600);
	let height = $derived(width * 0.5);

	// Margins around the chart to position it properly inside the SVG container
	const margin = { top: 16, right: 16, bottom: 16, left: 16 };

	// Mapping projection
	let projection = $derived(
		geoAlbers()
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
		3600: '< 60',
		5400: '< 90',
		7200: '< 120'
	};

	// Colour scale
	const colour = $derived(scaleOrdinal().domain(travelTimes).range(colours));

	// Show transit lines value and function
	let showTransit = $state(false);

	function handleTransitClick() {
		showTransit = !showTransit;
	}
	let [x, y] = $derived(
		projection([
			venueSelected.venue_geometry.coordinates[0],
			venueSelected.venue_geometry.coordinates[1]
		])
	);
	function getVenueCoords(venue) {
		return projection([venue.venue_geometry.coordinates[0], venue.venue_geometry.coordinates[1]]);
	}
	let selectedVenueCoords = $derived(getVenueCoords(venueSelected));
	let hoveredVenue = $state({ venue: null });
	let hoveredRoute = $state([{ route_id: null }]);

	function scaleFromVenue(node, options) {
		return {
			duration: options.duration,
			delay: options.delay || 0,
			easing: options.easing,
			css: (t) =>
				`transform:scale(${t}); transform-origin: ${selectedVenueCoords[0]}px ${selectedVenueCoords[1]}px;`
		};
	}

	function scaleFromPath(node, options) {
		// Get the path's bounding box
		const bbox = node.getBBox();
		// Calculate the center point of the path
		const centerX = bbox.x + bbox.width / 2;
		const centerY = bbox.y + bbox.height / 2;
		
		return {
			duration: options.duration,
			delay: options.delay || 0,
			easing: options.easing,
			css: (t) => {
				// Start with a small scale and gradually increase
				const scale = 0.1 + (t * 0.9);
				// Start with low opacity and gradually increase
				const opacity = 0.3 + (t * 0.6);
				return `
					transform: scale(${scale});
					transform-origin: ${centerX}px ${centerY}px;
					opacity: ${opacity};
				`;
			}
		};
	}

	let hoveredData = $state();
	let m = $state({ x: 0, y: 0 });
	let venueTooltipPosition = $state({ x: 0, y: 0 });
	let isochroneTooltipPosition = $state({ x: 0, y: 0 });

	function handleMouseMove(event, venue) {
		hoveredVenue = venue;
		venueTooltipPosition = {
			x: event.clientX,
			y: event.clientY
		};
	}

	function handleIsochroneMouse(event, isochrone) {
		hoveredData = isochrone;
		isochroneTooltipPosition = {
			x: event.clientX,
			y: event.clientY
		};
	}
</script>

<div class="chart-container" bind:clientWidth={width}>
	<h4>Select a venue <span class="text-gray-500 text-sm">or click on the map</span></h4>
	<select bind:value={venueSelected}>
		{#each venues as venue}
			<option value={venue}>
				{venue.venue}
			</option>
		{/each}
	</select>
	<h3 class="opacity-75">Events: {venueSelected.events}</h3>
	<LegendHTML
		legend_data={travelTimes}
		legend_color_function={colour}
		legend_label_array={travelTimeCategories}
		{width}
	/>

	<svg
		{width}
		{height}
		class="svg-container"
		onpointermove={(event) => {
			m.x = event.offsetX;
			m.y = event.offsetY;
		}}
		onmouseleave={() => {
			hoveredData = null;
		}}
	>
		<!-- svelte-ignore a11y_click_events_have_key_events --->
		<!-- Legend 
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			<Legend legend_data={travelTimes} legend_color_function={colour} legend_label_array={travelTimeCategories} {width}/>
		</g> --->
		<!-- 
		<g transform={`translate(${margin.left}, ${margin.top})`}>
			{#each travelTimes as time, i}
				<g transform={`translate(${width/2 + (i * width/2) / 4}, -4)`}>
					<!-- Color box
					<rect
						style="border-radius:10px;"
						width="16"
						height="16"
						rx="4"
						ry="4"
						fill={colour(time)}
					/>
					<!-- Category text 
					<text class="fill-gray-800" x="20" y="10" font-size="14px" alignment-baseline="middle"
						>{travelTimeCategories[time]} mins</text
					>
				</g>
			{/each}
		</g>-->
		<g>
			<!-- Census Tracts -->
			<path
				d={path(tracts)}
				fill="white"
				stroke="#333"
				stroke-opacity=".4"
				fill-opacity=".8"
				onmouseleave={() => {
					hoveredRoute = [{ route_id: null }];
					hoveredData = null;
				}}
			/>
			<!-- Isochrones -->

			{#each isochronesSorted as isochrone, i (isochrone.properties.id)}
				<path
					class="isochrone"
					in:scaleFromPath|global={{
						duration: isochrone.properties.travel_time / 10,
						delay: (3 - i) * 400,
						easing: quadOut
					}}
					d={path(isochrone.geometry)}
					stroke="transparent"
					fill={colour(isochrone.properties.travel_time)}
					opacity=".9"
					onmouseover={(e) => {
						handleIsochroneMouse(e, isochrone);
						hoveredVenue = { venue: null };
					}}
					onfocus={(e) => {
						hoveredData = isochrone;
						hoveredVenue = { venue: null };
					}}
				/>
			{/each}
			{#if hoveredData}
				{#key hoveredData.properties.id}
					<path
						d={path(hoveredData)}
						fill="transparent"
						stroke="black"
						stroke-width="1.5"
						stroke-opacity="0.85"
						pointer-events="none"
						transition:fade
					/>
				{/key}
			{/if}

			<!-- Transit lines -->
			{#if showTransit}
				<g>
					{#each metroRoutes.features as route}
						<path
							transition:draw|global={{ duration: 800 }}
							d={path(route.geometry)}
							stroke={route.properties.route_color}
							fill="none"
							tabIndex="0"
							stroke-linecap="round"
							stroke-width={hoveredRoute.route_id == route.properties.route_id ? '7.5' : '2.5'}
							onmouseover={() => {
								hoveredRoute = route.properties;
							}}
							onfocus={() => {
								hoveredRoute = route.properties;
							}}
						/>
					{/each}
					{#each metroLinkRoutes.features as route}
						<path
							transition:draw|global={{ delay: 400, duration: 800 }}
							d={path(route.geometry)}
							stroke={route.properties.route.route_color}
							fill="none"
							stroke-width={hoveredRoute.route_id == route.properties.route.route_id
								? '7.5'
								: '2.5'}
							onmouseover={() => {
								hoveredRoute = route.properties.route;
							}}
							onfocus={() => {
								hoveredRoute = route.properties.route;
							}}
						/>
					{/each}
				</g>
			{/if}
			{#each venues as venue}
				<circle
					cx={getVenueCoords(venue)[0]}
					cy={getVenueCoords(venue)[1]}
					r={(hoveredVenue.venue == venue.venue) |
					(venueSelected.venue == venue.venue)
						? '10'
						: '6'}
					stroke="white"
					stroke-width="2"
					stroke-opacity={venueSelected.venue == venue.venue ? 1 : 0.75}
					fill-opacity={venueSelected.venue == venue.venue ? 1 : 0.65}
					fill={venueSelected.venue == venue.venue ? '#2166ac' : 'black'}
					onmouseover={() => {
						hoveredData = null;
						handleMouseMove(event, venue);
					}}
					onmouseleave={() => {
						hoveredVenue = { venue: null };
					}}
					onclick={() => {
						venueSelected = venue;
						hoveredData = null;
					}}
					style="transition: all 150ms ease;"
				/>
			{/each}
		</g>
	</svg>
	{#if hoveredRoute.route_id}
		<RouteTooltip data={hoveredRoute} {width} {margin} />
	{/if}
	{#if hoveredVenue.venue && (venueSelected.venue != hoveredVenue.venue ?? venueSelected.venue)}
		<VenueTooltip data={hoveredVenue} {projection} {venueTooltipPosition}/>
	{/if}
	<IsochroneTooltip data={hoveredData} {isochroneTooltipPosition} />

	<h3 class="flex justify-start mx-4 opacity-75">
		{venuePopPercent} of residents live within 2 hrs of the venue by public transit
	</h3>
</div>
<PercentBar data={isochronesFiltered} {travelTimeCategories} {colours} />
<button onclick={handleTransitClick}
	>{#if showTransit}Hide{:else}Show{/if} Transit</button
>
<div class="caption">
	<p class="text-sm text-gray-500 text-right mb-0 mt-2">
		Source: <a href="https://traveltime.com/apis/isochrones">TravelTime API</a>
	</p>
	<p class="text-sm text-gray-500 text-right">
		For details on how the data was collected, see Methodology section
	</p>
</div>

<style>
	.chart-container {
		position: relative;
		width: 100%;
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

	.isochrone {
		cursor: pointer;
	}

	button {
		position: absolute;
		padding: 4px 8px;
		color: rgb(80, 80, 80);
		font-size: 0.9rem;
		opacity: 0.9;
		text-decoration: underline;
	}

	select {
		font-size: 1.25rem;
		text-decoration: underline;
		padding: 4px 8px;
		background-color: transparent;
		border-bottom: 2px solid var(--color-theme-2);
	}

	select option {
		font-size: 1rem;
	}
</style>
