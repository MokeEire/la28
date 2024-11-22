<script>
    import { PUBLIC_MAPTILER_KEY } from '$env/static/public';
	import { MapLibre, Marker, Popup, DefaultMarker, GeoJSON, LineLayer } from 'svelte-maplibre';
    import { lineString } from '@turf/turf';

    export let venue;
    let nearestStopLine = lineString([venue.venue_geometry.coordinates, venue.nearest_stop[0].geometry.coordinates])
</script>

<GeoJSON data={nearestStopLine}>
    <LineLayer
        layout={{ 'line-cap': 'round', 'line-join': 'round'}}
        paint={{
            'line-width': 3,
            //'line-dasharray': [5, 2],
            'line-color': '#000',
            'line-opacity': 0.8,
          }}
        />
</GeoJSON>