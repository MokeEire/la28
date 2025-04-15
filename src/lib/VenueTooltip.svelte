<script>
    import { fly } from 'svelte/transition';
	let { data, projection } = $props();

	let [x, y] = $derived(
		projection([data.venue_geometry.coordinates[0], data.venue_geometry.coordinates[1]])
	);
</script>

<div class="tooltip" style="position: absolute; top: {y+116}px; left: {x-160}px" transition:fly>
	<h1>{data.venue_simplified}</h1>
</div>

<style>
    .tooltip {
    padding: 4px 2px;
    text-align-last: right;
    background: white;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 8px;
    border-radius: 3px;
    pointer-events: none;
    transition: top 300ms ease, left 300ms ease;
}
h1 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 6px;
    width: 100%;
}

h2 {
    font-size: 0.8rem;
    font-weight: 300;
    text-transform: uppercase;
}

span {
    background: #dda0dd50;
    font-size: 80%;
    margin-left: 2px;
    padding: 2px 4px;
    display: inline-block;
    vertical-align: bottom;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.7);
}
</style>