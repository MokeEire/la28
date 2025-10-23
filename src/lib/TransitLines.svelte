<script>
	// Components

    // Functions
	import { draw } from 'svelte/transition';

	// Data
	import metroRoutes from '$lib/metroRoutes.geojson.json';
	import metroLinkRoutes from '$lib/metroLinkRoutes.geojson.json';

    // Props
	let {
		path
	} = $props();

	let hoveredRoute = $state([{ route_id: null }]);
</script>

<g>
	{#each metroRoutes.features as route}
		<path
			transition:draw|global={{ duration: 800 }}
			d={path(route.geometry)}
			stroke={route.properties.route_color}
			fill="none"
            role="graphics-symbol"
            aria-label={`${route.properties.route_long_name}`}
			tabIndex="0"
			stroke-linecap="round"
			stroke-width={hoveredRoute.route_id == route.properties.route_id ? '7.5' : '2.5'}
			onmouseover={() => {
				hoveredRoute = route.properties;
			}}
			onfocus={() => {
				hoveredRoute = route.properties;
			}}
            onmouseleave={() => {
				hoveredRoute = { route_id: null };
			}}
		/>
	{/each}
	{#each metroLinkRoutes.features as route}
		<path
			transition:draw|global={{ delay: 400, duration: 800 }}
			d={path(route.geometry)}
			stroke={route.properties.route.route_color}
			fill="none"
            role="graphics-symbol"
            aria-label={`${route.properties.route.route_long_name}`}
			stroke-width={hoveredRoute.route_id == route.properties.route.route_id ? '7.5' : '2.5'}
			onmouseover={() => {
				hoveredRoute = route.properties.route;
			}}
			onfocus={() => {
				hoveredRoute = route.properties.route;
			}}
            onmouseleave={() => {
				hoveredRoute = { route_id: null };
			}}
		/>
	{/each}
</g>

<!-- Transit Route Tooltip 
{#if hoveredRoute.route_id}
		<RouteTooltip data={hoveredRoute} {width} {margin} />
	{/if} 
-->

<style>

</style>
