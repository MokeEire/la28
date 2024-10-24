<script>
	import gtfsToGeoJSON from 'gtfs-to-geojson';
	import { readFile } from 'fs/promises';

	const config_file = JSON.parse(await readFile(new URL('$lib/agencyData.json', import.meta.url)));

	gtfsToGeoJSON(config_file)
		.then(() => {
			console.log('GeoJSON Generation Successful');
		})
		.catch((err) => {
			console.error(err);
		});
</script>
