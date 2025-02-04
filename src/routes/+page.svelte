<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import IsochroneMap from '$lib/IsochroneMap.svelte';
	import TravelTimeBar from '$lib/TravelTimeBar.svelte';
	import * as turf from '@turf/turf';
	import { union, sort, descending } from 'd3-array';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/venues_complete.json';
	import isochrones from '$lib/isochronesTransit2025.geojson.json';

	let venueSelected = $state(stadia[11]);

	let isochronesRewind = turf.rewind(isochrones, { reverse: true });

	let isochronesFiltered = $derived(
		isochronesRewind.features.filter(
			(d) => d.properties.venue == venueSelected.venue && d.properties.travel_time <= 60 * 120
		)
	);
	

</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto my-8">
		<p>
			Los Angeles will host the 2028 Summer Olympics with an unprecedented promise: the events will
			be car-free. 
			"[To attend the LA 2028 Olympics] you will have to take transit, walk, bicycle,
			or get dropped off," <a
				href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/"
				>declared LA Metro's CEO, Stephanie Wiggans</a
			>. 
			For a city synonymous with car culture and freeway sprawl, this sounds too good to be true. 
			Indeed, when I talk to friends and fellow Metro passengers about the idea of a car-free Los Angeles, the reaction is remarkably consistent.
			"Yeah we'll see" they say, with a chuckle.
			Their jaded disbelief has been hardened by years of failed transit promises and being forced to choose freeway gridlock over a slow and inaccessible transit system.
		</p>
		<h1>Public Transit in LA</h1>
		<p>
			What is it like to travel around LA by public transit? 
			The overwhelming response from LA
			residents in a <a
				href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf"
				>survey about mobility conducted by USC Dornsife</a
			> is that transit is slow, inconvenient, and unsafe. 
			Roughly 60% of respondents said that public buses are inconvenient for going to work or for personal trips. 
			Meanwhile, around 50% of respondents said the same about the metro. 
			The primary concern with buses is that they are slow, while the primary concern with the metro is that it is not close to where people live.
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

		<h1 style="font-family:var(--font-mono);">BAR CHART</h1>
		<BarChartTest />
		<TravelTimeBar data={isochronesRewind.features}/>

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

		<h4>Select a venue</h4>
		<select bind:value={venueSelected}>
			{#each stadia as venue}
				<option value={venue}>
					{venue.venue}
				</option>
			{/each}
		</select>
		
		
		
		<IsochroneMap venue={venueSelected} {isochronesFiltered}/>
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
	select {
		font-size: 1.5rem;
		text-decoration: underline;
		padding: 4px 8px;
		background-color: transparent;
		border-bottom: 2px solid var(--color-theme-2)
	}

	select option {
		font-size: 1rem;
	}
</style>
