<script lang="ts">
    import { scaleBand, scaleLinear } from 'd3-scale';
    import { stack, stackOffsetDiverging } from 'd3-shape';
    import Tooltip from '$lib/Tooltip.svelte';
    import SplitBar from '$lib/SplitBar.svelte';
  
    // Define category keys
    type ConvenienceKey =
      | 'veryInconvenient'
      | 'inconvenient'
      | 'someInconvenient'
      | 'neutral'
      | 'neutralNegative'
      | 'neutralPositive'
      | 'someConvenient'
      | 'convenient'
      | 'veryConvenient';

      // Define category keys
    type SafetyKey =
      | 'veryUnsafe'
      | 'unsafe'
      | 'someUnsafe'
      | 'neutral'
      | 'neutralNegative'
      | 'neutralPositive'
      | 'someSafe'
      | 'safe'
      | 'verySafe';
  
    // Example survey data
    type DataItem = {
      mode: string;
    } & Record<ConvenienceKey, number>;

    // Example survey data
    type SafeDataItem = {
      mode: string;
    } & Record<SafetyKey, number>;
  
    const safetyData: SafeDataItem[] = [
      {
        mode: 'Private vehicle',
        veryUnsafe: .035,
        unsafe: .03,
        someUnsafe: .079,
        neutral: .119,
        neutralNegative: .119/2,
        neutralPositive: .119/2,
        someSafe: .215,
        safe: .32,
        verySafe: .201
      },
      {
        mode: 'Metro',
        veryUnsafe: .157,
        unsafe: .21,
        someUnsafe: .272,
        neutral: .2,
        neutralNegative: .2/2,
        neutralPositive: .2/2,
        someSafe: .117,
        safe: .035,
        verySafe: .008
      },
      {
        mode: 'Bus',
        veryUnsafe: .121,
        unsafe: .189,
        someUnsafe: .291,
        neutral: .191,
        neutralNegative: .191/2,
        neutralPositive: .191/2,
        someSafe: .133,
        safe: .056,
        verySafe: .021
      }
    ];

    const convenienceData: DataItem[] = [
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
      }
    ];
  
    // Color mapping for categories
    const convenienceColours: Record<ConvenienceKey, string> = {
      veryInconvenient: '#b2182b',
      inconvenient: '#ef8a62',
      someInconvenient: '#fddbc7',
      neutral: '#cccccc',
      neutralNegative: '#cccccc',
      neutralPositive: '#cccccc',
      someConvenient: '#d1e5f0',
      convenient: '#67a9cf',
      veryConvenient: '#2166ac'
    };
    const safetyColours: Record<SafetyKey, string> = {
      veryUnsafe: '#b2182b',
      unsafe: '#ef8a62',
      someUnsafe: '#fddbc7',
      neutral: '#cccccc',
      neutralNegative: '#cccccc',
      neutralPositive: '#cccccc',
      someSafe: '#d1e5f0',
      safe: '#67a9cf',
      verySafe: '#2166ac'
    };
    //['#b2182b','#ef8a62','#fddbc7','#f7f7f7','#d1e5f0','#67a9cf','#2166ac']
  
    // Configure stack generator with normalization and offset
    const stackGen = stack<DataItem, ConvenienceKey>()
      .value((d, key) => {
        const total = convenienceKeys.reduce((sum, k) => sum + d[k], 0);
        return (d[key] / total);
      })
      .offset(stackOffsetDiverging);

      const stackGenSafety = stack<SafetyDataItem, SafetyKey>()
      .value((d, key) => {
        const total = safetyKeys.reduce((sum, k) => sum + d[k], 0);
        return (d[key] / total);
      })
      .offset(stackOffsetDiverging);
  
    const convenienceKeys: ConvenienceKey[] = [
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
    const safetyKeys: SafetyKey[] = [
      'veryUnsafe',
      'unsafe',
      'someUnsafe',
      'neutral',
      'neutralNegative',
      'neutralPositive',
      'someSafe',
      'safe',
      'verySafe'
    ];

    // Color mapping for categories
    const convenienceLabels: Record<ConvenienceKey, string> = {
      veryInconvenient: 'Very Inconvenient',
      inconvenient: 'Inconvenient',
      someInconvenient: 'Somewhat Inconvenient',
      neutral: 'Neither Inconvenient nor Convenient',
      someConvenient: 'Somewhat Convenient',
      convenient: 'Convenient',
      veryConvenient: 'Very Convenient'
    };
    // Color mapping for categories
    const safetyLabels: Record<SafetyKey, string> = {
      veryUnsafe: 'Very Unsafe',
      unsafe: 'Unsafe',
      someUnsafe: 'Somewhat Unsafe',
      neutral: 'Neither Inconvenient nor Safe',
      someSafe: 'Somewhat Safe',
      safe: 'Safe',
      verySafe: 'Very Safe'
    };
  
    // Define negative and positive keys
    const negativeKeys: ConvenienceKey[] = ['neutralNegative', 'someInconvenient', 'inconvenient', 'veryInconvenient'];
    const positiveKeys: ConvenienceKey[] = ['neutralPositive', 'someConvenient', 'convenient', 'veryConvenient'];
    const neutralKeys: ConvenienceKey[] = ['neutral'];

    const whiteTextKeysConvenience: ConvenienceKey[] = [
		'veryInconvenient',
		'inconvenient',
		'convenient',
		'veryConvenient'
	];

    // Define negative and positive keys
    const negativeSafetyKeys: SafetyKey[] = ['neutralNegative', 'someUnsafe', 'unsafe', 'veryUnsafe'];
    const positiveSafetyKeys: SafetyKey[] = ['neutralPositive', 'someSafe', 'safe', 'verySafe'];
    const neutralSafetyKeys: SafetyKey[] = ['neutral'];

    const whiteTextKeysSafety: SafetyKey[] = [
		'veryUnsafe',
		'unsafe',
		'safe',
		'verySafe'
	];
  
    // Generate negative and positive stacks
    const negativeStack = $derived(stackGen.keys(negativeKeys)(convenienceData));
    const positiveStack = $derived(stackGen.keys(positiveKeys)(convenienceData));
    const neutralStack = $derived(stackGen.keys(neutralKeys)(convenienceData));
  
    let width = $state(600);
    let height = 160;
    let margin = { top: 20, right: 20, bottom: 20, left: 160 };
  
    const totalWidth = $derived(width - margin.left - margin.right);
    const totalHeight = height - margin.top - margin.bottom;
  
    const yScale = scaleBand()
      .domain(convenienceData.map((d) => d.mode))
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
  
  <SplitBar
    data={convenienceData}
    title={"Convenience"} 
    subtitle={"How convenient - in terms of speed, ease of getting to where you are going, and parking – is it to use"}
    categoryKeys={convenienceKeys}
    categoryLabels={convenienceLabels}
    categoryColours={convenienceColours}
    {stackGen}
    {positiveKeys}
    {negativeKeys}
    {neutralKeys}
    whiteTextKeys={whiteTextKeysConvenience} />

    <SplitBar
    data={safetyData}
    title={"Safety"} 
    subtitle={"How safe are you from harassment or crime while using"}
    categoryKeys={safetyKeys}
    categoryLabels={safetyLabels}
    categoryColours={safetyColours}
    stackGen={stackGenSafety}
    positiveKeys={positiveSafetyKeys}
    negativeKeys={negativeSafetyKeys}
    neutralKeys={neutralSafetyKeys}
    whiteTextKeys={whiteTextKeysSafety} />
    <p class="caption">Source: <a href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf">LABarometer survey on Mobility & Sustainability (Wave 4)</a></p>

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
        margin-bottom: 1rem;
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