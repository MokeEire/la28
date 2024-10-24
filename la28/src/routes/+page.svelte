<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import UsingMapLibre from '$lib/UsingMapLibre.svelte';
	import UsingMapbox from '$lib/UsingMapbox.svelte';
	//import GetGTFSData from '$lib/GetGTFSData.svelte';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import stadia from '$lib/stadia.json';
</script>

<div class="app">
	<Navbar />
	<ul>
		<li>
			Where are the venues?
			<ul>
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

	<UsingMapLibre data={stadia} />
	<!--<GetGTFSData />-->

	<!--<UsingMapbox />-->

	<ul>
		<li>
			How can people get to the venues?
			<ul>
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

<style>
	.app {
		text-align: center;
	}
</style>
