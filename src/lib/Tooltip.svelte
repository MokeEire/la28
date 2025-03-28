<script>
    import { fly } from 'svelte/transition';
	let { data, stackedKey, xScale, yScale } = $props();

	let x = $derived(xScale(data[stackedKey]));
	let y = $derived(yScale(data.mode));
	const whiteTextKeys: CategoryKey[] = [
		'veryInconvenient',
		'inconvenient',
		'convenient',
		'veryConvenient'
	];
</script>

<div class="tooltip" style="position: absolute; top: {y+64}px; left: {x-40}px" transition:fly>
    <p class="text-gray-500 text-xs">How convenient - in terms of speed, ease of getting to where you are going, and parking – is it to use {data.mode == 'Private vehicle' ? 'a' : 'the'}</p>
	<h1>{data.mode}</h1>
	<h2>
		{data[stackedKey].toLocaleString('en-US', {
        style: 'percent',
        minimumFractionDigits: 1
		})} of people responded 
		<span
			class="font-semibold bg-[{colours[stackedKey as CategoryKey]}]"
			style="background-color:{colours[stackedKey as CategoryKey]};color:{whiteTextKeys.includes(
				stackedKey
			)
				? 'white'
				: 'black'};">{labels[stackedKey]}</span
		>
	</h2>
</div>

<style>
    .tooltip {
    padding: 8px 6px;
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