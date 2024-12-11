<script>
    import tracts from "$lib/nhgis_la_subset.geojson.json";
    //import * as topojson from "topojson-client";

    import { geoAlbers, geoPath } from "d3-geo";
    //import { scaleLinear } from "d3-scale";

    let width = 400;
  $: height = width;

    $: projection = geoAlbers()
        .rotate([118, 0])
        .center([0, 34])
        .scale(width * 2)
        .translate([width / 2, height / 2]);

    $: path = geoPath().projection(projection);
</script>

<div class="chart-container" bind:clientWidth={width}>
    <svg {width} {height} >
      <!-- svelte-ignore a11y-click-events-have-key-events --->
      <!-- Borders -->
      <path d={path(tracts)} fill="none" stroke="#fefefe80" />
      <!-- Selected country Borders -->
    </svg>
</div>