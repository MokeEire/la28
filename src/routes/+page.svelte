<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import IsochroneMap from '$lib/IsochroneMap.svelte';
	import TravelTimeBar from '$lib/TravelTimeBar.svelte';
	import SplitBar from '$lib/SplitBar.svelte';
	import SplitBarOG from '$lib/SplitBarOG.svelte';
	import * as turf from '@turf/turf';
	import { union, sort, descending } from 'd3-array';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/venues_complete.json';
	import isochrones from '$lib/isochronesTransit.geojson.json';

	let venueSelected = $state(stadia[9]);

	let isochronesRewind = turf.rewind(isochrones, { reverse: true });

	

	let colourPalette = ['#ffffb2','#fecc5c','#fd8d3c','#e31a1c']
</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto my-8">
		<p>
			The 2028 Olympic Games in Los Angeles will be <span class="font-medium italic">car-free</span>, meaning fans <a
				href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/"
				>"will have to take transit, walk, bicycle, or get dropped off"</a
			> according to LA Metro CEO Stephanie Wiggans. 
			This is a jarring promise to a city in which just one in four who report using any form of public transit in the past year, according to the latest<a href="https://cesr.usc.edu/sites/default/files/Mobility_Sustainability_Topline_Wave4.pdf"
			>LABarometer survey on mobility</a
		>.
		In contrast, nine in ten people use cars to get around Los Angeles, and the majority use a car every day or most days.
			Clearly LA's public transit system is not meeting the needs of its residents. 
			Looking at the proposed venues for the 2028 Olympics, what is the current state of public transit in Los Angeles? 
			This analysis uses a time-based approach to assess the accessibility of the venues by public transit for the population of Los Angeles.
			To understand the magnitude of LA's Olympic challenge, I analyzed how accessible the proposed Olympic venues are today by public transit. 
			The results reveal a stark reality: most Angelenos would need to spend over an hour to reach any venue, with some nearly impossible to access even within two hours.
		</p>
		<TravelTimeBar data={isochronesRewind.features} colours={colourPalette}/>

		<p>
			The summary above shows the percentage of the population that can reach each venue by public transit within 30, 60, 90, and 120 minutes.
			Most Angelenos today can expect to spend over 1 hour to get to any of the venues. 
			Despite being the venue	for both the opening and closing ceremonies, SoFi Stadium is accessible to just 15% of the
			population within an hour by transit.
			While half of the 14 venues are accessible to the majority of Angelenos within 90 minutes by public transit, 
			venues like the Sepulveda Basin Recreation Area and Riviera Country Club aren't accessible to most of the population within two hours by transit.
			The downtown venues are the most accessible, with 63-85% of residents able to reach them within 90 minutes.
		</p>

		<p>
			I wanted to see what it would look like for Angelenos to travel to the proposed venues by public transit today. 
			
			However for four of the venues, most people can’t even reach them within two hours.
			For the purposes of this analysis, I focus on 90 minute travel times because I suspect 90 minutes is toward the upper end of what people would consider a "reasonable" journey time across Los Angeles.
		</p>

		<IsochroneMap venues={stadia} {venueSelected} {isochronesRewind} colours={colourPalette}/>
		
		<p>
			Short, 30 minute transit journeys to the venues are exceedingly rare. The
			downtown venues form the only truly transit-accessible zone with 63-85% of residents able to
			reach the venues within 90 minutes. In the middle, the South Bay and Inglewood venues are
			accessible to roughly half (47-58%) of Angelenos within 90 minutes. Despite being the venue
			for both the opening and closing ceremonies, SoFi Stadium is accessible to just 15% of the
			population within an hour by transit. The Sepulveda Basin Recreation Area and Riviera Country
			Club are by far the least accessible, with just 16% and 9% of the population able to reach
			them within 90 minutes respectively.
		</p>
		<p>
			The gulf between Olympic ambitions and transit reality raises questions about how LA will
			transform its transportation system, and whether changes made for the Games will leave a
			lasting impact on the city's mobility. Indeed, one of the four objectives of the LA 2028
			Transport Strategy is to change residents' transit behaviors and encourage broader use of LA's
			transit system "before, during, and after the Games."
		</p>
		<h1>LA's Transit Plan</h1>
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

		<p>
			While this attitude must be frustrating for Metro and the city's transportation planners, it's
			hardly surprising. The vast majority of people in Los Angeles rely on cars to get around. The <a
				href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A"
				>LA Barometer</a
			>, a survey conducted by USC Dornsife, found that in 2024,
			<a href="https://cesr.usc.edu/sites/default/files/Mobility_Sustainability_Topline_Wave4.pdf"
				>nine out of ten people say they used cars to get around Los Angeles in the past year</a
			>, and the majority used a car every day or most days. In contrast, just one in four Angelenos
			said they used public transit in the past year, and with less frequency than cars too. 30% of
			bus riders and 15% of metro riders said they used their mode of transit every day or most
			days.
		</p>
		<p>
			These accessibility challenges are reflected in how Angelenos perceive their transportation options. 
			LABarometer survey data reveals a dramatic convenience gap between private vehicles and public transit.The LA Barometer also asked about the convenience and safety of peoples' modes of travel.
			While 60% of respondents said public buses were inconvenient for going to work or for personal
			trips, around 50% said the same about the metro. Despite LA being famous for its traffic, over
			70% of respondents said that driving was convenient for going to work or for personal trips.
			Clearly, the transit system is not meeting people's needs, in particular: convenience and
			accessibility.
		</p>
		<SplitBar />
		
		

		<p>
			While this attitude must be frustrating for Metro and the city's transportation planners, it's
			not surprising. Angelenos have been clear and consistent about their experiences getting
			around the city: transit is slower, less reliable, and less safe than driving. As a result,
			the vast majority of people in Los Angeles rely on cars to get around. The <a
				href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A"
				>LA Barometer</a
			>, a survey conducted by USC Dornsife, found that in 2024,
			<a href="https://cesr.usc.edu/sites/default/files/Mobility_Sustainability_Topline_Wave4.pdf"
				>nine out of ten people say they used cars to get around Los Angeles in the past year</a
			>, and the majority used a car every day or most days. In contrast, just one in four Angelenos
			said they used public transit in the past year, and with less frequency than cars too. 30% of
			bus riders and 15% of metro riders said they used their mode of transit every day or most
			days.
		</p>
		

		<p>
			Consider this: for residents of Whittier in Southeast Los Angeles County, reaching the
			Sepulveda Basin Recreation Area—a future Olympic venue—by public transit takes longer than
			traveling from London to Paris. This almost three-hour journey across just 40 miles of LA
			illustrates why most Angelenos rely on cars for daily transportation.
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
