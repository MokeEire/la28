<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	//import UsingSvelteLibre from '$lib/UsingSvelteLibre.svelte';
	//import UsingMapLibreGL from '$lib/UsingMapLibreGL.svelte';
	import BarChartTest from '$lib/BarChartTest.svelte';
	import IsochroneMap from '$lib/IsochroneMap.svelte';
	//import { union } from 'd3-array';
	//import GetGTFSData from '$lib/GetGTFSData.svelte';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/venues_complete.json';
	//import metroRoutes from '$lib/metroRoutes.geojson.json';
	//import metroLinkRoutes from '$lib/metroLinkRoutes.geojson.json';
	//import isochrones from '$lib/isochronesPop.geojson.json';

	let venueNames = stadia.map(d => d.venue)

	let venueSelected = $state(stadia[0]);

	//$inspect(venueSelected)

</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto my-8">
		<p>
			For residents of Whittier, the 40 mile public transit journey to the Sepulveda Basin Recreation Area, an upcoming Olympic venue, takes longer than than it takes Londoners to travel 285 miles to Paris.
			According to the latest transportation & mobility survey from USC's Dornsife, 92% of Angelenos use cars to get around the city. 
			Astronomical journey times like this are part of the reason that just 25% of residents said they public transit in the past year. 
			One of the four objectives of the LA 2028 Transport Strategy is to change residents' transit behaviours and encourage broader use of LA's transit system "before, during, and after the Games".
			Why do Angelenos not use public transit?
		</p>
		<p>
			The overwhelming response from LA residents in a <a
				href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf"
				>survey about mobility conducted by USC Dornsife</a
			> is that transit is inconvenient. 
			Roughly 60% of respondents said that public buses are inconvenient
			for going to work or for personal trips. 
			Meanwhile, around 50% of respondents said the same about the metro.
			The primary concern with buses is that they are slow, while the primary concern with the metro is that it is not close to where people live.
		</p>
		<p>
			To illustrate the inconvenience of public transit in Los Angeles, here is an isochrone map for each of the 2028 Olympic venues. 
			These maps show how long it takes to get to each venue by public transit. 
			For example, the map for the Sepulveda Basin Recreation Area shows that it takes more than 2 hours to get there by public transit from Whittier, a city 40 miles away.
		</p>

		<h4>Select a venue</h4>
		<select bind:value={venueSelected}>
		{#each stadia as venue}
			<option value={venue}>
				{venue.venue}
			</option>
		{/each}
		</select>
		<IsochroneMap venue={venueSelected} />
		
		
		<h1>LA's Transportation Plan</h1>
		<p>
			Of course, the Olympic Games are not being held today.
			Los Angeles has time to prepare, so what are they doing?
			
			Outside of existing transportation projects, nothing.
			The two major infrastructure projects that the city is promising to deliver by 2028 are the extension of the Purple Line to Westwood and the completion of the transit connection to LAX.
			Connecting LAX to the transit system is a big deal, but it's not going to make everyday transit better for Angelenos (except those working at the airport).
			The Purple Line is more important for making the city accessible and will likely speed up transit times for a lot of the Westside.
		</p>
		
		
		<h1>Public Transit in Los Angeles</h1>
		<p>What does LA's transit system look like? How many rail lines? How many bus routes?</p>
		

		

		<p>
			Where is transit accessible in LA? How many people live within a 15 minute walk of a metro
			station?
		</p>

		<h1>Getting to the Olympics</h1>

		<p>
			So not everywhere in LA is accessible, but what about the venues? How long does it take to get
			to the venues by transit? How does that compare to driving?
		</p>
		<BarChartTest />

		<h1>What's LA's plan?</h1>

		<hr />

		<h1>Rough Work</h1>

		<p>
			Imagine you’re in downtown Los Angeles and you want to go to SoFi stadium - one of the city’s
			big new venues which will host the swimming events in the 2028 Olympics. The good news is that
			you’re in one of the best places to get the metro in the city, the bad news is that it is
			still going to take 2-3 times longer than driving would. You could take the J line for 24
			minutes from 1st St station to Manchester/Harbor Freeway, then get 115 bus for 19 minutes down
			Manchester, and then you’re a 13 minute walk away from the stadium (this is at 11:45AM on a
			Monday). Alternatively, you could hop in your car and you would be there in 25 minutes.
			Unfortunately this is often the trade-off for those of us that even consider using public
			transit in Los Angeles.
		</p>

		<p>
			Los Angeles’ leadership has vowed a “car-free” Olympics in 2028. This is an admirable goal
			that will help drive much needed transportation improvements, but it feels
			inconsiderate/disconnected/dishonest to say that people will not be able to attend the
			Olympics unless they travel by transit, bike, or walk. Without owning the current situation
			and admitting that LA's public transportation does not serve the majority of people, the
			implication is that the problem is not the infrastructure but the willingness to use it. While
			the city has made some progress in expanding its public transit network, allowing spectators
			to only use transit to get to the games makes them inaccessible to a significant portion of
			the city. I wanted to illustrate some of the reasons why Angelenos don't use public transit.
		</p>
		<p></p>

		<h1>Transit is too far</h1>
		<p>
			What % of population lives within 1km of rail? Create a 1km buffer around rail lines and
			identify how much of the population are served by rail lines using census tract/block
			population data How far are venues from the nearest metro station?
		</p>
		<h1>Transit is much slower than driving</h1>
		<p>
			What are the travel times between venues? What are travel times between most populous
			neighbourhoods and venues? What are Angelenos' commute times in car vs. transit?
		</p>
		<h1>So how are they going to do it?</h1>
		<h2>Car-free zones</h2>
		<h2>Lots of buses</h2>
		<h1>Will we see a car-free olympics?</h1>
		<p>
			Why is it that public transport doesn't work for more people in LA? It's slow, poorly
			maintained, and doesn't go where people need it to go. Even in the places where it does go,
			it's often not safe or convenient to walk to the station. The stations and walkways feel like
			intrusions into the car's habitat, situating passengers 6 feet from 6 lanes of freeway traffic
			on either side. I say all this as an avid user of public transit.
		</p>

		<p>
			Living without a car is often a point of pride among the climate conscious, but in Los Angeles
			it is a flex of tremendous proportions. While I managed to be car-free for a number of years
			in LA, it was not easy. It was only possible because I lived and worked along the E (then
			Expo) Line and I had a generous group of friends who helped me when I needed it.
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
