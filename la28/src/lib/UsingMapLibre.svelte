<script>
	import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import { MapLibre, Marker, Popup, DefaultMarker } from 'svelte-maplibre';
	import { mapClasses } from '$lib/styles';

	export let data;
</script>

<MapLibre
	center={[-118.25, 34.01]}
	zoom={8.94}
	maxZoom={8.94}
	minZoom={8.94}
	class={mapClasses}
	dragPan={false}
	style="https://api.maptiler.com/maps/basic-v2/style.json?key={PUBLIC_MAPTILER_KEY}"
>
	{#each data as { lngLat, label, name }  (label)}
		<!-- Unlike the custom marker example, default markers do not have mouse events,
    and popups only support the default openOn="click" behavior 
		<DefaultMarker {lngLat}>
			<Popup offset={[0, -10]}>
				<div class="text-lg font-bold">{name}</div>
			</Popup>
		</DefaultMarker>-->
        <!-- Using Custom Markers: https://svelte-maplibre.vercel.app/examples/custom_marker-->
		<Marker
			{lngLat}
			class="grid h-8 w-8 place-items-center rounded-full border border-gray-200 text-black shadow-2xl focus:outline-2 focus:outline-black bg-sky-400/80"
		>
		<span class="material-symbols-outlined">
			stadium
			</span>
        <Popup offset={[0, -10]}>
            <div class="text-lg font-bold">{name}</div>
        </Popup>
        </Marker>
	{/each}
</MapLibre>

<style lang="postcss">
	:global(.map) {
		height: 400px;
	}

	
</style>