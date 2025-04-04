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
		>. 
			Asking Los Angeles to rely on the transit system is a jarring challenge to a city in which 75% of the population report using no form of public transit in the past year, according to the <a href="https://dornsife.usc.edu/news/stories/metro-unsafe-say-those-no-longer-riding-post-pandemic/">latest LABarometer survey</a>. 
			Nine in ten people use cars to get around Los Angeles, and the majority use a car every day or most days. 
		</p>
		<p>
			To understand the magnitude of LA's Olympic challenge, I analyzed how accessible the proposed Olympic venues are by public transit by looking at the journey times Angelenos face today. 
			The results reveal a stark reality: most Angelenos would need to spend 60-90 minutes to reach any venue.  
			Events like BMX, skateboarding, and archery are planned to be held at the Sepulveda Basin Recreation Area, but currently this venue is inaccessible to the majority of the city even within two hours. 
			For residents of Whittier in Southeast Los Angeles County, reaching the venue by public transit takes longer than traveling from London to Paris. 
			This three-hour journey across just 40 miles of LA illustrates why most Angelenos rely on cars for daily transportation.
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
		
		<p>
			These accessibility challenges are also reflected in how Angelenos perceive their transportation options. 
			<a href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A">LABarometer survey data</a> reveals a dramatic gaps in how people perceive convenience and safety travelling by private vehicles and public transit.
			Despite LA being infamous for its traffic, over 70% of respondents said that driving was convenient for going to work or for personal trips.
			Fewer than 30% of respondents said the same of buses or the metro. 
			When it comes to safety, more than half of Angelenos said they felt unsafe using public transit, while 74% said they felt safe driving.
			Clearly, the transit system is not meeting people's needs with regards to convenience and safety.
		</p>
		<SurveyCharts />
		
		
		
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
		<p>
			This analysis used travel time data to identify the areas in Los Angeles which can access each
			venue by public transit within 30, 60, 90, and 120 minutes and the population which lives
			there. Using public transit: Less than 10% of LA County's population can reach any venue
			within 30 minutes, Only half the population can access venues within 90 minutes Even with a
			two-hour journey time, half of the venues are inaccessible to at least a quarter of the
			population
		</p>
		<h2>Data Sources and Tools</h2>
		<p> 
			To analyze transit accessibility to the proposed 2028 Olympic venues, I used multiple data sources and analytical tools:
		</p>
			<ul>
			<li>Olympic venues: I obtained the list of proposed Olympic venues from the official LA 2028 website</li>
			<li>Population data: I incorporated census tract population data from the National Historical Geographic Information System (NHGIS) to calculate accessibility percentages</li>
			<li>Isochrones: I generated isochrones using the TravelTime API, which provides travel time data for public transit routes</li>
			<li>GTFS: I accessed LA Metro's GTFS (General Transit Feed Specification) data directly from their official repository to obtain current transit routes and schedules</li>
			</ul>
		

		
	</div>

	<!--<GetGTFSData />-->

	<!--<UsingMapLibreGL />-->
</div>

<style>
	

	@media (max-width: 720px) {
		.app {
			padding: 1em;
		}
	}
</style>
