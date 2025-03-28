<script>
    import { fly } from 'svelte/transition';
	let { data, width } = $props();

</script>

<div class="tooltip" style="background-color:{data.route_color}; color:{data.route_text_color};position: absolute; top: {width/10}px; left: {width*.6}px" transition:fly>
	<h1>{data.route_long_name} </h1>
</div>

<style>
    .tooltip {
        padding: 2px 4px;
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
    border-radius: 3px;
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