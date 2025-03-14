<script>
	// Declare props using $props
	let { legend_data, legend_color_function, legend_label_array, width } = $props();
</script>

<div class="legend-container mx-4 opacity-90">
	{#each legend_data as time, i}
		<div class="legend-item">
			<!-- Color box -->
			<div class="legend-rect" style="background-color: {legend_color_function(time)};"></div>
			<!-- Category text -->
			<span class="legend-text">{legend_label_array[time]} mins</span>
		</div>
	{/each}
</div>

<style>
	.legend-container {
		display: flex;
		justify-content: flex-end;
        gap: 16px;
	}

    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px
    }
	.legend-rect {
		width: 16px;
		height: 16px;
		border-radius: 10px;
	}
	.legend-text {
		font-size: 14px;
		color: var(--color-text);
		vertical-align: middle;
	}
</style>
