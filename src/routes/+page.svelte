<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import UsingSvelteLibre from '$lib/UsingSvelteLibre.svelte';
	import UsingMapLibreGL from '$lib/UsingMapLibreGL.svelte';
	//import GetGTFSData from '$lib/GetGTFSData.svelte';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/venues_complete.json';
	import metroRoutes from '$lib/metroRoutes.geojson.json';
	import metroLinkRoutes from '$lib/metroLinkRoutes.geojson.json';
</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto">
		<p>
			Living without a car is often a point of pride among the climate conscious, but in Los Angeles it is a flex of tremendous proportions.
			While I managed to be car-free for a number of years in LA, it was not easy and only possible because I lived and worked along the E (then Expo) Line.
			Why is it that public transport doesn't work for more people in LA? It's slow, poorly maintained, and doesn't go where people need it to go. 
			Even in the places where it does go, it's often not safe or convenient to walk to the station. 
			The stations and walkways feel like intrusions into the car's habitat, situating passengers 6 feet from 6 lanes of freeway traffic on either side.
		</p>
		<p>
			I say all this as an avid user of public transit. 
		</p>
		<ul>
			<li>
				Where are the venues?
				<ul class="list-disc list-inside">
					<li>
						Source: <a
							href="https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics"
							>Wikipedia</a
						>
					</li>
					<li>What's the capacity of the venues?</li>
				</ul>
			</li>
		</ul>
		
	</div>

	<UsingSvelteLibre venues={stadia} {metroRoutes} {metroLinkRoutes} />
		<!--<GetGTFSData />-->

		<UsingMapLibreGL />
		<div class="max-w-prose mx-auto">
		<ul>
			<li>
				How can people get to the venues?
				<ul class="list-disc list-inside">
					<li>Rail</li>
					<li>Bus</li>
					<li>Car</li>
					<li>Walk</li>
				</ul>
			</li>
		</ul>

		<p>
			Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation
		</p>
		</div>
</div>

<style>
</style>
