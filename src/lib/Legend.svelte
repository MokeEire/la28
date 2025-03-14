<script>
    // Declare props using $props
  let { legend_data, legend_color_function, legend_label_array, width } = $props();
</script>

    {#each legend_data as time, i}
            <!-- Color box -->
            <rect
                style="border-radius:10px;"
                width="16"
                height="16"
                x={width/3+(i * 100)}
                y="4"
                fill={legend_color_function(time)}
            />
            <!-- Category text -->
            <text class="fill-gray-800" x={width/3+(64+ i * 100)} y="16" font-size="14px" alignment-baseline="middle"
                >{legend_label_array[time]} mins</text
            >
{/each}