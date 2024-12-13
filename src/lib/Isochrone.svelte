<script>
	export let isochroneData;
	export let path;
    export let colourScale;
    export let venue;

</script>

{#each isochroneData as isochrone}
	{#if isochrone.properties.venue == venue}
		<!-- <path d={path(turf.rewind(isochrone.geometry, {reverse: true}))} stroke="grey" fill="green" opacity=.9/>-->
		<path 
			d={path(isochrone.geometry)}
			stroke="grey"
			fill={colourScale(isochrone.properties.travel_time)}
			opacity=".9"
            
		/>
	{/if}
{/each}
