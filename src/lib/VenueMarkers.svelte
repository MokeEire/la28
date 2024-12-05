<script>
	import { MapLibre, Marker, Popup, DefaultMarker, GeoJSON, LineLayer } from 'svelte-maplibre';
	import LineToNearestStop from '$lib/LineToNearestStop.svelte';
	export let venues;

	//console.log(venues[0])
	//console.log(lineString([venues[0].venue_geometry.coordinates, venues[0].nearest_stop[0].geometry.coordinates]))
</script>

{#each venues as venue}
		<!-- Unlike the custom marker example, default markers do not have mouse events,
    and popups only support the default openOn="click" behavior 
		<DefaultMarker {lngLat}>
			<Popup offset={[0, -10]}>
				<div class="text-lg font-bold">{name}</div>
			</Popup>
		</DefaultMarker>-->
        <!-- Using Custom Markers: https://svelte-maplibre.vercel.app/examples/custom_marker-->
		<Marker
			lngLat={venue.venue_geometry.coordinates}
			class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 text-black shadow-2xl focus:outline-2 focus:outline-black bg-sky-400/80"
		>
		<span class="material-symbols-outlined">
			stadium
			</span>
        <Popup offset={[0, -10]}>
            <div class="text-lg font-bold">{venue.venue}</div>
			<p>Events: {venue.events}</p>
			{#each venue.sources as source, i}
				<a class="block text-right" href={source}>Source #{i+1}</a>
			{/each}
        </Popup>
        </Marker>
		<Marker
			lngLat={venue.nearest_stop[0].geometry.coordinates}
			class="grid h-4 w-4 place-items-center rounded-full border border-gray-200 text-black shadow-2xl focus:outline-2 focus:outline-black bg-red-400/80"
		/>
		<LineToNearestStop venue={venue} />
		
	{/each}