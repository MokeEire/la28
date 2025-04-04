<script>
		import { quadOut } from 'svelte/easing';

		let {
			isochroneData,
			path,
			colourScale,
			venueCoords
		} = $props();

		$inspect(isochroneData)

		function scaleFromVenue(node, options) {
        return {
            duration: options.duration,
			delay: options.delay || 0,
            easing: options.easing,
            css: t => `transform:scale(${t}); transform-origin: ${venueCoords[0]}px ${venueCoords[1]}px;`
        }
    }   
</script>

{#each isochroneData as isochrone, i}
		<!-- <path d={path(turf.rewind(isochrone.geometry, {reverse: true}))} stroke="grey" fill="green" opacity=.9/>-->
		<path 
		in:scaleFromVenue|global={{ duration: isochrone.properties.travel_time/4, delay: (3-i)*400, easing: quadOut }}
			d={path(isochrone.geometry)}
			stroke="grey"
			fill={colourScale(isochrone.properties.travel_time)}
			opacity=".9"
            
		/>
{/each}
