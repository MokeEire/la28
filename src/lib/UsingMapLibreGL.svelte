<script lang="ts">
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import { onMount, onDestroy } from 'svelte';
	import maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	let map;
	let mapContainer: HTMLDivElement;

	onMount(() => {
		const map = new maplibregl.Map({
			container: mapContainer,
			style: `https://api.maptiler.com/maps/basic-v2/style.json?key=${PUBLIC_MAPTILER_KEY}`,
			center: [-118.25, 34.01],
			zoom: 8.94,
			minZoom: 8.94,
			hash: true,
			attributionControl: false
		});
		map.addControl(new maplibregl.NavigationControl({}), 'top-right');
		map.addControl(
			new maplibregl.GeolocateControl({
				positionOptions: { enableHighAccuracy: true },
				trackUserLocation: true
			}),
			'top-right'
		);
		map.addControl(new maplibregl.ScaleControl({ maxWidth: 80, unit: 'metric' }), 'bottom-left');
		map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
	});
</script>

<div class="map-wrap mx-auto">
	<a href="https://www.maptiler.com" class="watermark"
		><img src="https://api.maptiler.com/resources/logo.svg" alt="MapTiler logo" /></a
	>
	<div class="map" bind:this={mapContainer}></div>
</div>

<style>
	@import 'maplibre-gl/dist/maplibre-gl.css';
	.map-wrap {
		position: relative;
		width: 70%;
		height: calc(100vh - 77px); /* calculate height of the screen minus the heading */
	}

	.map {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.watermark {
		position: absolute;
		left: 10px;
		bottom: 10px;
		z-index: 999;
	}
</style>
