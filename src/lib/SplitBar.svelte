<script lang="ts">
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { stack, stackOffsetDiverging } from 'd3-shape';
    import Tooltip from '$lib/Tooltip.svelte';

    // Define category keys
    type ConvenienceKey =
      | 'veryInconvenient'
      | 'inconvenient'
      | 'someInconvenient'
      | 'neutral'
      | 'neutralNegative'
      | 'neutralPositive'
      | 'convenient'
      | 'someConvenient'
      | 'veryConvenient';
  
    let { data, title, subtitle, categoryKeys, categoryLabels, categoryColours, stackGen, positiveKeys, negativeKeys, neutralKeys, whiteTextKeys } = $props();
    
  
    // Generate negative and positive stacks
    const negativeStack = $derived(stackGen.keys(negativeKeys)(data));
    const positiveStack = $derived(stackGen.keys(positiveKeys)(data));
    const neutralStack = $derived(stackGen.keys(neutralKeys)(data));
  
    let width = $state(600);
    let height = 160;
    let margin = { top: 20, right: 20, bottom: 20, left: 160 };
  
    const totalWidth = $derived(width - margin.left - margin.right);
    const totalHeight = height - margin.top - margin.bottom;
  
    const yScale = scaleBand()
      .domain(data.map((d) => d.mode))
      .range([0, totalHeight])
      .padding(0.2);
  
    const xScale = $derived(
      scaleLinear().domain([-1, 1]).range([0, totalWidth])
    );
  
    const xTicks = $derived(xScale.ticks(5).filter((t) => t !== 0));

    //$inspect(negativeStack);
    const minX = $derived(Math.max(...negativeStack.map((d) => Math.max(...d.map((d) => d[1])))));
    let hoveredData = $state(null);
    let hoveredStackKey = $state(null);
    //$inspect(hoveredData);
  </script>
  <h3 class="font-bold">{title}</h3>
  <p class="text-gray-500 text-sm font-medium">{subtitle}</p>
  <div class="chart-container" bind:clientWidth={width}>
    <svg {width} {height} onmouseleave={() => hoveredData = null}>
      <g transform={`translate(${margin.left},${margin.top})`}>

        <!-- Center line and ticks -->
        {#key totalHeight}
          
  
          {#each xTicks as tick}
            <line
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={0}
              y2={totalHeight + 5}
              stroke="grey" />
            <text
              x={xScale(tick)}
              y={totalHeight + 15}
              text-anchor="middle"
              font-size="12"
              fill="grey">
              {Math.abs(tick)*100}%
            </text>
          {/each}
        {/key}
        <!-- Negative stacks -->
        {#each negativeStack as stack}
          {#each stack as d, i}
            <rect
              x={xScale(-d[1])}
              y={yScale(data[i].mode)}
              width={xScale(-d[0]) - xScale(-d[1])}
              height={yScale.bandwidth()}
              stroke={data[i].mode == (hoveredData ?? [0]).mode && stack.key == hoveredStackKey ? 'black' : 'transparent'}
              stroke-width="2"
              fill={categoryColours[stack.key]} 
              fill-opacity=".95"
              tabindex="0"
              onmouseover={() => {
                hoveredData = data[i]
                hoveredStackKey = stack.key
              }
            }
            onfocus={() => {
                hoveredData = data[i]
                hoveredStackKey = stack.key
              }
            }/>
            {#if data[i][stack.key] > 0.1}
            <text
            class="font-semibold text-xs"
            y={yScale(data[i].mode) + (yScale.bandwidth()) / 2}
            x={xScale(-d[1])-(xScale(-d[1])-xScale(-d[0]))/2}
            text-anchor="middle"
            fill="white">{data[i][stack.key].toLocaleString('en-US', {
                style: 'percent',
                minimumFractionDigits: 0
            })}</text>
            {/if}
          {/each}
        {/each}
        
  
        <!-- Positive stacks -->
        {#each positiveStack as stack}
          {#each stack as d, i}
            <rect
              x={xScale(d[0])}
              y={yScale(data[i].mode)}
              width={xScale(d[1]) - xScale(d[0])}
              height={yScale.bandwidth()}
              stroke={data[i].mode == (hoveredData ?? [0]).mode && stack.key == hoveredStackKey ? 'black' : 'transparent'}
              stroke-width="2"
              fill={categoryColours[stack.key]} 
              fill-opacity=".95"
              tabindex="0"
              onmouseover={() => {
                hoveredData = data[i]
                hoveredStackKey = stack.key
              }
            }
            onfocus={() => {
                hoveredData = data[i]
                hoveredStackKey = stack.key
              }
            }/>
            {#if data[i][stack.key] > .1}
                <text
                class="font-semibold text-xs"
                y={yScale(data[i].mode) + (yScale.bandwidth()) / 2}
                x={xScale(d[0])+(xScale(d[1])-xScale(d[0]))/2}
                text-anchor="middle"
                fill="white">{data[i][stack.key].toLocaleString('en-US', {
                    style: 'percent',
                    minimumFractionDigits: 0
                })}</text>
                {/if}
          {/each}
        {/each}

        <!-- Positive stacks -->
        {#each neutralStack as stack}
          {#each stack as d, i}
            <rect
              x={xScale(-d[1]/2)}
              y={yScale(data[i].mode)}
              width={xScale(d[1]) - xScale(d[0])}
              height={yScale.bandwidth()}
              stroke={data[i].mode == (hoveredData ?? [0]).mode && stack.key == hoveredStackKey ? 'black' : 'transparent'}
              stroke-width="2"
              fill={categoryColours[stack.key]} 
              fill-opacity=".95"
              tabindex="0"
              onmouseover={() => {
                hoveredData = data[i]
                hoveredStackKey = stack.key
              }
            }
            onfocus={() => {
                hoveredData = data[i]
                hoveredStackKey = stack.key
              }
            }/>
          {/each}
        {/each}
  
        <line
            x1={xScale(0)}
            x2={xScale(0)}
            y1={0}
            y2={totalHeight}
            stroke="black"
            stroke-width="1" />
        <!-- Labels -->
        {#each data as d}
          <text
          class="font-medium text-base"
            x={xScale(-minX) - margin.left}
            y={yScale(d.mode) + (yScale.bandwidth()) / 2}
            text-anchor="end"
            fill="black">
            {d.mode}
          </text>
        {/each}
  
        
  
        <!-- Legend 
        <g transform={`translate(${-100}, ${margin.top - 90})`}>
          <rect
            x="0"
            y="0"
            width="20"
            height="10"
            fill={categoryColors.veryInconvenient} />
          <text x="25" y="9" font-size="12" fill="black">Very inconvenient</text>
  
          <rect
            x="150"
            y="0"
            width="20"
            height="10"
            fill={categoryColors.inconvenient} />
          <text x="175" y="9" font-size="12" fill="black">Inconvenient</text>
  
          <rect
            x="250"
            y="0"
            width="20"
            height="10"
            fill={categoryColors.neutral} />
          <text x="275" y="9" font-size="12" fill="black">Neither Inconvenient nor Convenient</text>
  
          <rect
            x="350"
            y="0"
            width="20"
            height="10"
            fill={categoryColors.convenient} />
          <text x="375" y="9" font-size="12" fill="black">Convenient</text>
  
          <rect
            x="450"
            y="0"
            width="20"
            height="10"
            fill={categoryColors.veryConvenient} />
          <text x="475" y="9" font-size="12" fill="black">Very Convenient</text>
        </g> -->
      </g>
    </svg>
    {#if hoveredData}
      <Tooltip data={hoveredData} surveyQuestion={subtitle} stackedKey={hoveredStackKey} labels={categoryLabels} colours={categoryColours} {whiteTextKeys} {xScale} {yScale} />
    {/if}
  </div>

  <style>
    .chart-container {
		position: relative;
		width: 100%;
		margin-bottom: 1rem;
	}

    .caption {
        font-size: 0.8rem;
        color: #666;
        margin-top: 1rem;
        text-align: right;
    }

    h3 {
        font-family: var(--font-sans);
    }
    p {
      font-family: var(--font-sans);
      margin-bottom: 0;
    }
    text {
      font-family: var(--font-sans);
    }

  </style>