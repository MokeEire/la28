<script lang="ts">
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { stack, stackOffsetDiverging } from 'd3-shape';
    import Tooltip from '$lib/Tooltip.svelte';
  
    // Define category keys
    type CategoryKey =
      | 'veryInconvenient'
      | 'inconvenient'
      | 'someInconvenient'
      | 'neutral'
      | 'neutralNegative'
      | 'neutralPositive'
      | 'convenient'
      | 'someConvenient'
      | 'veryConvenient';
  
    // Example survey data
    type DataItem = {
      mode: string;
    } & Record<CategoryKey, number>;
  
    const data: DataItem[] = [
      {
        mode: 'Private vehicle',
        veryInconvenient: .052,
        inconvenient: .027,
        someInconvenient: .083,
        neutral: .092,
        neutralNegative: .092/2,
        neutralPositive: .092/2,
        someConvenient: .145,
        convenient: .286,
        veryConvenient: .314
      },
      {
        mode: 'Bus',
        veryInconvenient: .188,
        inconvenient: .203,
        someInconvenient: .205,
        neutral: .17,
        neutralNegative: .17/2,
        neutralPositive: .17/2,
        someConvenient: .148,
        convenient: .056,
        veryConvenient: .03
      },
      {
        mode: 'Metro',
        veryInconvenient: .146,
        inconvenient: .173,
        someInconvenient: .201,
        neutral: .189,
        neutralNegative: .189/2,
        neutralPositive: .189/2,
        someConvenient: .183,
        convenient: .08,
        veryConvenient: .027
      }
    ];
  
    // Color mapping for categories
    const categoryColors: Record<CategoryKey, string> = {
      veryInconvenient: '#aa0503',
      inconvenient: '#df3d26',
      someInconvenient: '#EC8F83',
      neutral: '#cccccc',
      neutralNegative: '#cccccc',
      neutralPositive: '#cccccc',
      someConvenient: '#85DCFF',
      convenient: '#0087BB',
      veryConvenient: '#005383'
    };
  
    // Configure stack generator with normalization and offset
    const stackGen = stack<DataItem, CategoryKey>()
      .value((d, key) => {
        const total = categoryKeys.reduce((sum, k) => sum + d[k], 0);
        return (d[key] / total);
      })
      .offset(stackOffsetDiverging);
  
    const categoryKeys: CategoryKey[] = [
      'veryInconvenient',
      'inconvenient',
      'someInconvenient',
      'neutral',
      'neutralNegative',
      'neutralPositive',
      'someConvenient',
      'convenient',
      'veryConvenient'
    ];
  
    // Define negative and positive keys
    const negativeKeys: CategoryKey[] = ['neutralNegative', 'someInconvenient', 'inconvenient', 'veryInconvenient'];
    const positiveKeys: CategoryKey[] = ['neutralPositive', 'someConvenient', 'convenient', 'veryConvenient'];
    const neutralKeys: CategoryKey[] = ['neutral'];
  
    // Generate negative and positive stacks
    const negativeStack = $derived(stackGen.keys(negativeKeys)(data));
    const positiveStack = $derived(stackGen.keys(positiveKeys)(data));
    const neutralStack = $derived(stackGen.keys(neutralKeys)(data));
  
    let width = $state(600);
    let height = 240;
    let margin = { top: 40, right: 20, bottom: 20, left: 160 };
  
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
  <h1>Convenience</h1>
  <h2>How convenient - in terms of speed, ease of getting to where you are going, and parking – is it to use a ...</h2>
  <div class="chart-container" bind:clientWidth={width}>
    <svg {width} {height} onmouseleave={() => hoveredData = null}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <!-- Negative stacks -->
        {#each negativeStack as stack}
          {#each stack as d, i}
          {console.log(xScale(d[1]), xScale(d[0]), xScale(d[1]) - xScale(d[0]) )}
            <rect
              x={xScale(-d[1])}
              y={yScale(data[i].mode)}
              width={xScale(-d[0]) - xScale(-d[1])}
              height={yScale.bandwidth()}
              stroke={data[i].mode == (hoveredData ?? [0]).mode && stack.key == hoveredStackKey ? 'black' : 'transparent'}
              stroke-width="2"
              fill={categoryColors[stack.key as CategoryKey]} 
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
            y={yScale(data[i].mode) + (yScale.bandwidth()) / 2}
            x={xScale(-d[1])-(xScale(-d[1])-xScale(-d[0]))/2}
            alignment-baseline="center"
            text-anchor="middle"
            font-size="12"
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
              fill={categoryColors[stack.key as CategoryKey]} 
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
                y={yScale(data[i].mode) + (yScale.bandwidth()) / 2}
                x={xScale(d[0])+(xScale(d[1])-xScale(d[0]))/2}
                alignment-baseline="center"
                text-anchor="middle"
                font-size="12"
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
              fill={categoryColors[stack.key as CategoryKey]} 
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
  
        <!-- Labels -->
        {#each data as d}
          <text
            x={xScale(-minX) - margin.left}
            y={yScale(d.mode) + (yScale.bandwidth()) / 2}
            alignment-baseline="middle"
            text-anchor="end"
            font-size="16"
            fill="black">
            {d.mode}
          </text>
        {/each}
  
        <!-- Center line and ticks -->
        {#key totalHeight}
          <line
            x1={xScale(0)}
            x2={xScale(0)}
            y1={0}
            y2={totalHeight}
            stroke="black"
            stroke-width="1" />
  
          {#each xTicks as tick}
            <line
              x1={xScale(tick)}
              x2={xScale(tick)}
              y1={totalHeight}
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
      <Tooltip data={hoveredData} stackedKey={hoveredStackKey} {xScale} {yScale}/>
    {/if}
    <p class="caption">Source: <a href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf">LABarometer survey on Mobility & Sustainability (Wave 4)</a></p>
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
  </style>