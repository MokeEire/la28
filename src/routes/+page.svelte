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
			Los Angeles is known for many things: the beaches, Hollywood, and the sprawling freeways usually come to mind.
			But one thing it is not known for is its public transportation system.
			Yet in 2028, Los Angeles will host the Summer Olympics, and our leaders <a href="https://www.theguardian.com/sport/article/2024/aug/10/las-mayor-says-2028-will-be-no-car-games-despite-citys-notorious-traffic">are promising</a> a "no-car Games."
		</p>
		<p>
			The Paris Olympics set a high bar for accessible transportation at a global event.
			Their post-Games report <a href="https://press.paris2024.org/assets/paris-2024-sustainability-legacy-post-games-report-summary-430a1-7578a.html">found</a> that 
			87% of spectators used public transit or other sustainable means to attend the games. 
			Despite <a href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A">75% of residents using no form of public transit in the past year</a>, and the majority using cars daily or nearly daily, city leadership has doubled down on a car-free Games.
			LA Metro CEO Stephanie Wiggins <a href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/">has said</a> 
			fans will not be able to drive to any of the venues. 
			Instead they "will have to take transit, walk, bicycle, or get dropped off".  
		</p>
		
		<p>
			While I love using transit in Los Angeles, I readily admit it doesn't work for everyone.
			The problems of accessibility and safety are too much of a hurdle for many Angelenos to use public transit.
			The <a href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A">LABarometer surveys</a> illustrate
			these challenges and reveal the dramatic disparities in convenience and safety between cars and public transit. 
			Despite LA being notorious for its traffic, over 70% of respondents said driving is convenient for both commuting and personal trips, 
			while fewer than 30% said the same about Metro rail and only 16% for buses. 
			Safety perceptions show an even more pronounced divide: 74% of Angelenos feel safe while driving, while less than half feeling secure on public transit. 
			LA's current transit system is falling significantly short of meeting passengers’ fundamental needs for efficient and secure transportation.
		</p>
		
		<SurveyCharts />

		<p>
			To understand if people could actually get to the proposed Olympic venues by public transit, I looked at the journey times Angelenos face today 
			if they were to only use transit, walk, or cycle. 
			While these journey times can't reflect the journey times we will experience in 2028, they reveal the magnitude of the challenge in transit accessibility and 
			further demonstrate why Angelenos are often skeptical that the city will accomplish it. 
			The data shows a stark reality: for any given venue, a transit journey for most Angelenos would take at least an hour. 
			The chart below shows the percentage of LA residents who can reach each venue within 30, 60, 90, and 120 minutes by public transit.
		</p>

		<TravelTimeBar data={isochronesRewind.features} colours={colourPalette}/>

		<p>
			LA's Olympic venues are spread across the city. 
			There are clusters in downtown and South Bay, and others in the San Fernando Valley, Santa Monica, and Inglewood.
			The downtown venues are the most accessible, with 63-85% of residents able to reach them within 90 minutes.
			Some of the critical venues like SoFi Stadium - set to host both the opening and closing ceremonies - 
			are accessible to just 15% of the population within an hour by transit. 
			Other venues like Sepulveda Basin Recreation Area (hosting BMX and skateboarding events) and 
			Riviera Country Club (hosting golf) remain unreachable for most residents even with a two-hour transit journey. 
			In fact, using transit to get to the Sepulveda Basin Recreation Area from Whittier, a city in southeast LA County, 
			takes longer than traveling from London to Paris.
		</p>

		<p>
			The interactive map below shows transit accessibility to the proposed venues through what's called an "isochrone" visualization—essentially a time-based heat map.
			While isochrones typically explore where you can reach from a specific point within a certain amount of time, the visuals below explore the points you could leave from in order to reach each venue in the given time period e.g. under 60 mins.
		</p>

		<IsochroneMap venues={stadia} {isochronesRewind} colours={colourPalette}/>

		<p>
			The gulfs between Olympic ambitions and transit reality raises questions about how LA will
			transform its transportation system, and whether changes made for the Games will leave a
			lasting impact on the city's mobility.
			Indeed, one of the four objectives of the LA 2028 Transport Strategy is to 
			change residents' transit behaviors and encourage broader use of LA's transit system "before, during, and after the Games."
		</p>
		<p>
			There is a lot of work being done to improve our transit system before 2028, most notably the expansion of the D Line towards UCLA 
			and multiple bus rapid transit routes.
			But there will also be plenty of temporary solutions in place for the Games, including dedicated Olympic lanes and shuttle services.
			However, these solutions are not a long-term fix for the city's transit system and are unlikely to achieve the behaviour change the Transport Strategy is seeking.
		</p>
		
		<p>
			While cities like Paris used the Olympic Games as a political catalyst for new transportation
			infrastructure, Los Angeles took a different approach. 
			Rather than proposing new transit projects, LA's Olympic plan largely relies on completing projects that were already in the
			works—primarily its airport transit connector and the extension of the Purple Line towards
			Beverly Hills and UCLA. 
		</p>
		<p>
			However, progress and priorities have shifted significantly since the
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
			You can explore the code for this project <a href="https://github.com/MokeEire/la28-r">here on GitHub</a>.
		</p>
		<p>
			The goal of this analysis was to explore how accessible LA's proposed Olympic venues are by public transit.
			I used an isochrone API from TravelTime to identify what areas of Los Angeles could reach each venue within different time frames and 
			used census data to estimate how many people live in those areas.
			To do this, I followed these steps:
		</p>
		<ol>
			<li>Collect and geocode the venues</li>
			<li>Generate isochrones for each venue using the TravelTime API</li>
			<li>Join population to the isochrones</li>
		</ol>
		<h2>Collect and geocode the venues</h2>
		<p> 
			I gathered the list of Olympic venues from the <a href="https://la28.org/en/games-plan/venues.html">official LA 2028 website</a> and entered the data into Google Sheets.
			To geocode the venues, I used the <a href="https://jessecambon.github.io/tidygeocoder/">tidygeocoder</a> package in R.
		</p>
		<h2>Generate the isochrones</h2>
		<p>
			I generated isochrones for each venue using the <a href="https://docs.traveltime.com/api/overview/introduction">TravelTime API</a>, which provides travel time data for public transit routes.
			I prepared API queries for each venue and timeframe (30, 60, 90, and 120 minutes) using the <a href="https://github.com/traveltime-dev/traveltime-sdk-r">timetravelR</a> package in R.
			I specified public transit as the travel mode, used the "fastest" routing profile, and increased the 
			allowable walking time at the start and end of the journey from 10 to 20 minutes.
		</p>
		<h2>Join population data to the isochrones</h2>
		<p>
			I retrieved census tract population and spatial data for Los Angeles County from NHGIS.
			The latest data available is from 2020.
			If a census tract was within or touched an isochrone, I considered the population of that tract to be able to access the venue within the given timeframe.
			While this isn't perfect (e.g. only a small portion of the census tract might overlap with isochrone), it is a close approximation. 
			To be more precise, one could go to the block level.
		</p>

	</div>

	<!--<GetGTFSData />-->

	<!--<UsingMapLibreGL />-->
</div>

<style>

h1 {
	font-size: 1.7rem;
}

h2 {
	font-size: 1.5rem;
}

	
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
