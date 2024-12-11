<script>
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import { MapLibre, Marker, Popup, DefaultMarker, GeoJSON, LineLayer } from 'svelte-maplibre';
	import { mapClasses } from '$lib/styles';
	//import {lineString} from '@turf/turf';
	import LineToNearestStop from '$lib/LineToNearestStop.svelte';
	import VenueMarkers from '$lib/VenueMarkers.svelte';
	export let venues;
	export let metroRoutes;
	export let metroLinkRoutes;
	export let showMetrolink;

	//console.log(venues[0])
	//console.log(lineString([venues[0].venue_geometry.coordinates, venues[0].nearest_stop[0].geometry.coordinates]))
</script>

<MapLibre
	center={[-118.25, 34.01]}
	zoom={8.94}
	minZoom={8.94}
	class="relative w-[50%] min-w-[700px] aspect-[9/16] max-h-[560px] sm:max-h-[560px] sm:aspect-video mx-auto my-5"
	style="https://api.maptiler.com/maps/basic-v2/style.json?key={PUBLIC_MAPTILER_KEY}"
>
	<!--<VenueMarkers {venues} />-->
	<GeoJSON id="metro-rail" data={metroRoutes}>
		<LineLayer
			layout={{ 'line-cap': 'round', 'line-join': 'round' }}
			paint={{
				'line-width': 3,
				//'line-dasharray': [5, 2],
				'line-color': ['get', 'route_color'], //'#008800',
				'line-opacity': 0.8
			}}
		/>
	</GeoJSON>
	{#if showMetrolink}
		<GeoJSON id="metrolink" data={metroLinkRoutes}>
			<LineLayer
				layout={{ 'line-cap': 'round', 'line-join': 'round' }}
				paint={{
					'line-width': 2,
					//'line-dasharray': [5, 2],
					'line-color': ['get', 'route_color', ['get', 'route', ['properties']]], //'#008800',
					'line-opacity': 0.8
				}}
			/>
		</GeoJSON>
	{/if}
</MapLibre>

<style lang="postcss">
	:global(.map) {
		height: 400px;
	}

	.showMetrolink {
		display: none;
	}
</style>
