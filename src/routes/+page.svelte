<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import IsochroneMap from '$lib/IsochroneMap.svelte';
	import TravelTimeBar from '$lib/TravelTimeBar.svelte';
	import SurveyCharts from '$lib/SurveyCharts.svelte';
	import * as turf from '@turf/turf';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/venues_complete.json';
	import isochrones from '$lib/isochronesTransit.geojson.json';

	

	let isochronesRewind = turf.rewind(isochrones, { reverse: true });

	

	let colourPalette = ['#ffffb2','#fecc5c','#fd8d3c','#e31a1c']
</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto my-8">
		<p>
			The Paris Olympics set a high bar for Olympic transportation in 2024 with <a href="https://press.paris2024.org/assets/paris-2024-sustainability-legacy-post-games-report-summary-430a1-7578a.html">87% of spectators using public transit to attend the games</a>. 
			In 2028, Los Angeles is attempting a similar feat. 
			Mayor Karen Bass <a href="https://www.theguardian.com/sport/article/2024/aug/10/las-mayor-says-2028-will-be-no-car-games-despite-citys-notorious-traffic">announced</a> 2028 will be a "no-car Games" and LA Metro CEO Stephanie Wiggins has said fans <a
			href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/"
			>"will have to take transit, walk, bicycle, or get dropped off"</a
		> to attend the events. 
		This vision seems to be completely at odds with the realities of transportation in Los Angeles, where <a href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A">75% of residents report using no form of public transit in the past year</a>, and nine in ten rely on cars for mobility—the majority using them daily or nearly daily. 
		</p>
		
		<p>
			The <a href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A">LABarometer surveys</a> provide some insight into LA’s love of driving, revealing dramatic disparities in convenience and safety between cars and public transit. 
			Despite LA's notorious traffic, over 70% of respondents characterized driving as convenient for both commuting and personal trips, while fewer than 30% said the same about Metro rail and only 16% for buses. 
			Safety perceptions show an even more pronounced divide: 74% of Angelenos reported feeling safe while driving, compared to less than half feeling secure on public transit. 
			LA's current transit system is falling significantly short of meeting passengers’ fundamental needs for efficient and secure transportation.
		</p>
		<SurveyCharts />
		<p>
			To understand how convenient the proposed Olympic venues are by public transit, I looked at the journey times Angelenos face today if they were to only use transit, walk, or cycle. 
			While these journey times cannot reflect the journey times we will experience during the Games in 2028, they reveal the magnitude of the challenge to make LA accessible by transit and further demonstrate why Angelenos are often skeptical that the city will accomplish it. 
			The results reveal a stark reality: for any given venue, a transit journey for most Angelenos would take 60-90 minutes. 
			</p>
		<TravelTimeBar data={isochronesRewind.features} colours={colourPalette}/>

		<p>
			The chart above shows the percentage of the Los Angeles population that can reach each venue by public transit within each time frame: 30, 60, 90, or 120 minutes. 
			Most Angelenos can expect to spend over 1 hour to get to any of the venues today. 
			While the downtown venues are the most accessible, with 63-85% of residents able to reach them within 90 minutes, venues critical to the Games present major challenges. 
			SoFi Stadium - set to host both the opening and closing ceremonies - is accessible to just 15% of the population within an hour by transit. 
			More concerning, venues like Sepulveda Basin Recreation Area (hosting BMX and skateboarding events) and Riviera Country Club (hosting golf) remain unreachable for most residents even with a two-hour transit journey. 
			The interactive map below shows transit accessibility to the proposed venues through what's called an "isochrone" visualization—essentially a time-based heat map.
		</p>

		<IsochroneMap venues={stadia} {isochronesRewind} colours={colourPalette}/>
		
		
		
		
		
		<h1>LA's Transit Plan</h1>
		<p>
			These gulfs between Olympic ambitions and transit reality raises questions about how LA will
			transform its transportation system, and whether changes made for the Games will leave a
			lasting impact on the city's mobility. Indeed, one of the four objectives of the LA 2028
			Transport Strategy is to change residents' transit behaviors and encourage broader use of LA's
			transit system "before, during, and after the Games."
		</p>
		<p>
			While cities like Paris used the Olympic Games as a political catalyst for new transportation
			infrastructure, Los Angeles took a different approach. Rather than proposing new transit
			projects, LA's Olympic plan largely relies on completing projects that were already in the
			works—primarily its airport transit connector and the extension of the Purple Line towards
			Beverly Hills and UCLA. However, progress and priorities have shifted significantly since the
			bid. Since 2018, Metro has substituted 11 of the original 28 infrastructure projects with ones
			deemed more achievable by 2028. In fact, three of the replacement projects were already
			completed when the list was revised, suggesting a focus on meeting numerical targets rather
			than transforming the city's transit system.Of the eight transportation projects originally
			listed in LA's Olympics bid that were expected to be completed by 2024, only one has been
			completed. This track record raises concerns about whether the remaining projects will be
			ready for the Games
		</p>
		<p>
			LA's Olympic transportation plan includes numerous temporary solutions—dedicated Olympic
			lanes, supplementary shuttle services, and adjusted schedules—that will likely ensure smooth
			operations during the Games. However, these temporary fixes mask a deeper challenge: the
			long-term health of LA's public transit system.
		</p>

		<h1>Methodology</h1>
		<p class="mb-4 font-mono text-sm text-gray-500">
			You can explore the code for this project <a href="">here on GitHub</a>.
		</p>
		<p>
			The goal of this analysis was to explore the accessibility of LA's proposed Olympic venues by public transit.
			The process involved the following steps
		</p>
		<ol>
			<li>Collect and geocode the venues</li>
			<li>Generate isochrones for each venue using the TravelTime API</li>
			<li>Join population to the isochrones</li>
		</ol>
		<h2>Collect and geocode the venues</h2>
		<p> 
			I gathered the list of proposed Olympic venues from the official LA 2028 website and entered the data into Google Sheets.
			To geocode the venues, I used the tidygeocoder package in R.
		</p>
		<h2>Generate the isochrones</h2>
		<p>
			I generated isochrones for each venue using the TravelTime API, which provides travel time data for public transit routes.
			I used the isochrones API to create isochrones for each venue, specifying the travel time intervals of 30, 60, 90, and 120 minutes.
			The isochrones were generated using the public transit mode and the "fastest" routing profile.
			I also specified the "walk" and "cycle" modes to generate isochrones for those modes as well.
		</p>
		<h2>Join population data to the isochrones</h2>
		<p>
			I used the US Census Bureau's population data to calculate the percentage of the population that can reach each venue within each time interval.
			I used the isochrones generated in the previous step to calculate the percentage of the population that can reach each venue within 30, 60, 90, and 120 minutes.
			I used the population data from the US Census Bureau to calculate the percentage of the population that can reach each venue within each time interval.
		</p>

	</div>

	<!--<GetGTFSData />-->

	<!--<UsingMapLibreGL />-->
</div>

<style>
	
	ol {
    margin: 1em 0;
    padding-left: 1.5em;
    list-style-type: decimal;
}

ol li {
    margin-bottom: 0.5em;
    font-size: 1.2rem;
    line-height: 1.5;
    color: #333; /* Adjust color as needed */
}

ol li::marker {
    color: var(--color-theme-1); /* Customize marker color */
    font-weight: bold;
}
	@media (max-width: 720px) {
		.app {
			padding: 1em;
		}
	}
</style>
