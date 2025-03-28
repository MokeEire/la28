<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import IsochroneMap from '$lib/IsochroneMap.svelte';
	import TravelTimeBar from '$lib/TravelTimeBar.svelte';
	import SplitBar from '$lib/SplitBar.svelte';
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
			The state of public transit in Los Angeles sounds pretty good on paper: we have one of the
			longest light rail systems in the country, LAX is finally being connected to the transit
			network, and the much awaited D Line that will connect UCLA and Beverly Hills to Downtown LA
			is seemingly on track to be completed by 2028. Against this backdrop of transit expansion, it
			might seem reasonable that the 2028 Olympics will be "car-free", meaning fans <a
				href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/"
				>"will have to take transit, walk, bicycle, or get dropped off"</a
			> according to LA Metro CEO Stephanie Wiggans. Angelenos are still skeptical. Every person I've
			told about L.A.'s car-free ambitions for the Olympics has responded with disbelief, concern, or
			a chuckle. "Yeah, we'll see," they say.
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
			The LA Barometer also asked about the convenience and safety of peoples' modes of travel.
			While 60% of respondents said public buses were inconvenient for going to work or for personal
			trips, around 50% said the same about the metro. Despite LA being famous for its traffic, over
			70% of respondents said that driving was convenient for going to work or for personal trips.
			Clearly, the transit system is not meeting people's needs, in particular: convenience and
			accessibility.
		</p>
		<SplitBar />
		<p>
			I wanted to see what it would look like for Angelenos to travel to the proposed venues by public transit today. 
			What I found was that half of the 14 venues are accessible to the majority of Angelenos within 90 minutes by public transit. 
			However for four of the venues, most people can’t even reach them within two hours.
			For the purposes of this analysis, I focus on 90 minute travel times because I suspect 90 minutes is toward the upper end of what people would consider a "reasonable" journey time across Los Angeles.
		</p>
		<TravelTimeBar data={isochronesRewind.features} colours={colourPalette}/>
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
		

		<IsochroneMap venues={stadia} {venueSelected} {isochronesRewind} colours={colourPalette}/>

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
			The LA Barometer also asked about the convenience and safety of peoples' modes of travel.
			While 60% of respondents said public buses were inconvenient for going to work or for personal
			trips, around 50% said the same about the metro. Despite LA being famous for its traffic, over
			70% of respondents said that driving was convenient for going to work or for personal trips.
			Clearly, the transit system is not meeting people's needs, in particular: convenience and
			accessibility.
		</p>
		<SplitBar />
		<p>Here's a look at how accessible the 2028 Olympic venues are by public transit.</p>
		

		<p>
			The buses are too slow, the trains are too far from where people live, and passengers do not
			feel safe. To illustrate why Angelenos don't see past these issues, below is a map that shows
			the extent of the city that can reach each of the 2028 Olympic venues by public transit within
			30, 60, 90, and 120 minutes.
		</p>
		
		<p>
			Los Angeles will host the 2028 Summer Olympics with an unprecedented promise: the events will
			be car-free. "[To attend the LA 2028 Olympics] you will have to take transit, walk, bicycle,
			or get dropped off," <a
				href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/"
				>declared LA Metro's CEO, Stephanie Wiggans</a
			>. For a city synonymous with car culture and freeway sprawl, this sounds too good to be true.
			Indeed, when I talk to friends and fellow Metro passengers about the idea of a car-free Los
			Angeles, the reaction is remarkably consistent. "Yeah we'll see" they say, with a chuckle.
			Their jaded disbelief has been hardened by years of failed transit promises and being forced
			to choose freeway gridlock over a slow and inaccessible transit system.
		</p>
		<h1>Public Transit in LA</h1>
		<p>
			What is it like to travel around LA by public transit? The overwhelming response from LA
			residents in a <a
				href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf"
				>survey about mobility conducted by USC Dornsife</a
			> is that transit is slow, inconvenient, and unsafe. Roughly 60% of respondents said that public
			buses are inconvenient for going to work or for personal trips. Meanwhile, around 50% of respondents
			said the same about the metro. The primary concern with buses is that they are slow, while the
			primary concern with the metro is that it is not close to where people live.
		</p>
		<p>
			Consider this: for residents of Whittier in Southeast Los Angeles County, reaching the
			Sepulveda Basin Recreation Area—a future Olympic venue—by public transit takes longer than
			traveling from London to Paris. This almost three-hour journey across just 40 miles of LA
			illustrates why most Angelenos rely on cars for daily transportation.
		</p>
		<p>
			The gulf between Olympic ambitions and transit reality raises questions about how LA will
			transform its transportation system, and whether changes made for the Games will leave a
			lasting impact on the city's mobility. Indeed, one of the four objectives of the LA 2028
			Transport Strategy is to change residents' transit behaviors and encourage broader use of LA's
			transit system "before, during, and after the Games."
		</p>

		<p>
			This analysis used travel time data to identify the areas in Los Angeles which can access each
			venue by public transit within 30, 60, 90, and 120 minutes and the population which lives
			there. Using public transit: Less than 10% of LA County's population can reach any venue
			within 30 minutes, Only half the population can access venues within 90 minutes Even with a
			two-hour journey time, half of the venues are inaccessible to at least a quarter of the
			population
		</p>
		<p>
			To illustrate the experience of public transit in Los Angeles, here is an isochrone map for
			each of the 2028 Olympic venues. These maps show how long it takes to get to each venue by
			public transit. For example, the map for the Sepulveda Basin Recreation Area shows that it
			takes more than 2 hours to get there by public transit from Whittier, a city 40 miles away.
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
