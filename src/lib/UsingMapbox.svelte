<script>
	import { onMount, onDestroy } from 'svelte';
	import Map from 'mapbox-gl';
	//import '@site/src/node_modules/mapbox-gl/dist/mapbox-gl.css';

    //import MAPBOX_KEY from '$env/static/public';

	let map;
	let mapContainer;
	let lng, lat, zoom;

	lng = -118.17;
	lat = 34;
	zoom = 8.8;

	onMount(() => {
		const initialState = { lng: lng, lat: lat, zoom: zoom };

		map = new Map({
			container: mapContainer,
			accessToken: MAPBOX_KEY,
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [initialState.lng, initialState.lat],
			zoom: initialState.zoom
		});
	});

	onDestroy(() => {
		map.remove();
	});
</script>

<div class="map-wrap">
	<div class="map" bind:this={mapContainer} />
</div>

<style>
	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}
</style>
