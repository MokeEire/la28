<script>
		import { fade } from 'svelte/transition';
		import { cubicInOut } from 'svelte/easing';

		let {
			isochroneData,
			path,
			colourScale,
			venue
		} = $props();

</script>

{#each isochroneData as isochrone}
		<!-- <path d={path(turf.rewind(isochrone.geometry, {reverse: true}))} stroke="grey" fill="green" opacity=.9/>-->
		<path 
		in:fade|global={{ duration: isochrone.properties.travel_time_mins*20, easing: cubicInOut }}
			d={path(isochrone.geometry)}
			stroke="grey"
			fill={colourScale(isochrone.properties.travel_time)}
			opacity=".9"
            
		/>
{/each}
