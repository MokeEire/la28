<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import UsingSvelteLibre from '$lib/UsingSvelteLibre.svelte';
	import UsingMapLibreGL from '$lib/UsingMapLibreGL.svelte';
	import BarChartTest from '$lib/BarChartTest.svelte';
	//import GetGTFSData from '$lib/GetGTFSData.svelte';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/venues_complete.json';
	import metroRoutes from '$lib/metroRoutes.geojson.json';
	import metroLinkRoutes from '$lib/metroLinkRoutes.geojson.json';

	let showMetrolink = true;

	function handleMetrolinkClick() {
		showMetrolink = !showMetrolink;
	}
</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto my-8">
		<blockquote>
			“Being car-free, you will not be able to drive as a spectator to any of the [Olympic] venues. You have to take transit, walk, bicycle or get dropped off.”
		</blockquote>
		<p>
			- Stephanie Wiggans, Metro CEO (<a href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/">Source</a>)
		</p>
		<p>
			There was a steep decline in transit usage during pandemic.
			In 2019, 35% of LA County residents said they used public transportation in the same survey.
		</p>
		<h1>Public Transit in Los Angeles</h1>
		<p>What does LA's transit system look like? How many rail lines? How many bus routes?</p>
		<UsingSvelteLibre venues={stadia} {metroRoutes} {metroLinkRoutes} {showMetrolink} />
		<button on:click={handleMetrolinkClick}>{#if showMetrolink}Hide{:else}Show{/if} Metrolink</button>

		<p>
			How do people feel about the transit system? The overwhelming response from LA residents in a <a
				href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf"
				>survey about mobility conducted by USC Dornsife</a
			> is that transit is inconvenient. Roughly 60% of respondents said that public buses are inconvenient
			for going to work or for personal trips. Meanwhile, around 50% of respondents said the same about
			the metro.
		</p>

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
		<p>
			Los Angeles’ leadership has vowed a “car-free” Olympics in 2028. 
			This is an admirable goal that will help drive much needed transportation improvements, but it feels inconsiderate/disconnected/dishonest to say that people will not be able to attend the Olympics unless they travel by transit, bike, or walk.
			Without owning the current situation and admitting that LA's public transportation does not serve the majority of people, the implication is that the problem is not the infrastructure but the willingness to use it. 
			While the city has made some progress in expanding its public transit network, allowing spectators to only use transit to get to the games makes them inaccessible to a significant portion of the city.
			I wanted to illustrate some of the reasons why Angelenos don't use public transit. 
		</p>
		<p>
			Transit in LA is inconvenient. That is the overwhelming response from LA residents in a <a href="https://dornsife.usc.edu/cesr/wp-content/uploads/sites/54/2024/06/UAS595_Topline.pdf">survey about mobility conducted by USC Dornsife</a>.
			Roughly 60% of respondents said that public buses are inconvenient for going to work or for personal trips.
			Meanwhile, around 50% of respondents said the same about the metro. 
		</p>
				
		<h1>Transit is too far</h1>
		<p>
			What % of population lives within 1km of rail?
			Create a 1km buffer around rail lines and identify how much of the population are served by rail lines using census tract/block population data
			How far are venues from the nearest metro station?
		</p>
		<h1>Transit is much slower than driving</h1>
		<p>
			What are the travel times between venues?
			What are travel times between most populous neighbourhoods and venues?
			What are Angelenos' commute times in car vs. transit?
		</p>
		<h1>So how are they going to do it?</h1>
		<h2>Car-free zones</h2>
		<h2>Lots of buses</h2>
		<h1>Will we see a car-free olympics?</h1>
		<p>
			Why is it that public transport doesn't work for more people in LA? It's slow, poorly maintained, and doesn't go where people need it to go. 
			Even in the places where it does go, it's often not safe or convenient to walk to the station. 
			The stations and walkways feel like intrusions into the car's habitat, situating passengers 6 feet from 6 lanes of freeway traffic on either side.
			I say all this as an avid user of public transit. 
		</p>
		<h1>Rough Work</h1>
		<p>
			Living without a car is often a point of pride among the climate conscious, but in Los Angeles it is a flex of tremendous proportions.
			While I managed to be car-free for a number of years in LA, it was not easy. 
			It was only possible because I lived and worked along the E (then Expo) Line and I had a generous group of friends who helped me when I needed it.
		</p>
	</div>

	<UsingSvelteLibre venues={stadia} {metroRoutes} {metroLinkRoutes} />
		<!--<GetGTFSData />-->

		<!--<UsingMapLibreGL />-->
</div>

<style>
	button {
		border: 2px solid #9418dc;
		background-color: #9418dc;
		border-radius: 8px;
		padding: 8px 16px;
		color: white;
		margin: 16px 0;
		font-size: 1rem;
		opacity: .9;
	}
</style>
