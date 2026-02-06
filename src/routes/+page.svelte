<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import IsochroneMap from '$lib/IsochroneMap.svelte';
	import TravelTimeBar from '$lib/TravelTimeBar.svelte';
	import SurveyCharts from '$lib/SurveyCharts.svelte';
	import * as turf from '@turf/turf';

	// source: https://en.wikipedia.org/wiki/Venues_of_the_2028_Summer_Olympics_and_Paralympics
	import venues from '$lib/venues_complete.json';
	import isochronesNew from '$lib/isochronesTransitCurrent.geojson.json';

	//let time = $state(9)
	//let arrtime = $derived(`2025-10-14T0${time}:00:00-0700`)
	/*
	function filterGeoJSON(geojson, condition) {
		const filteredFeatures = geojson.features.filter(condition);
		return {
			type: 'FeatureCollection',
			features: filteredFeatures
		};
	}
	//console.log(typeof(isochrones));
	//console.log(isochronesNew.features.filter((d) => d.properties.arrival_time == '2025-05-20T09:00:00-0700'));
	/*isochronesNew.features.forEach((feature) => {
  		console.log(typeof(feature))//.filter((d) => d.properties.arrival_time == '2025-05-20T09:00:00-0700')
	});
	// Example usage: filter features with a specific property value
	let isochronesFiltered = filterGeoJSON(isochronesNew, function (feature) {
		return feature.properties.arrival_time == arrtime;
	});
	//$inspect(isochronesFiltered);
	//$inspect(isochronesNew)
	*/
	let isochronesRewind = turf.rewind(isochronesNew, { reverse: true });


	let colourPalette = ['#ffffb2', '#fecc5c', '#fd8d3c', '#e31a1c'];
</script>

<div class="app">
	<Navbar />
	<div class="max-w-prose mx-auto my-8">
		<p>
			Sitting in bumper-to-bumper traffic on a cris-crossing concrete artery connecting freeway to freeway
			is a quintessential Los Angeles experience. The film La La Land immortalized this daily ritual in 
			<a href="https://www.youtube.com/watch?v=xVVqlm8Fq3Y">its opening scene</a>	almost a decade ago and
			this is still the reality of commuting today.
			Despite dealing with some of the heaviest traffic in the nation, 
			<a href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A">USC's LABarometer surveys</a>
			found that just 1 in 4 Angelenos used the public transit system in the past year.
			
		</p>
		<p>
			Against this backdrop, the <a
				href="https://www.theguardian.com/sport/article/2024/aug/10/las-mayor-says-2028-will-be-no-car-games-despite-citys-notorious-traffic"
				>announcement by LA leadership</a
			> that Angelenos <a
				href="https://abc7.com/post/2028-olympics-los-angeles-car-free-zones-remote-work-being-explored-ways-address-traffic/15186778/"
				>will not be able to drive to the 2028 Olympics</a
			> feels out of touch with the everyday experience of living in Los Angeles.
			For many across the city and county, public transit just isn't a viable option because 
			transit stations are not conveniently located, people don't feel safe, and it often takes three to four times longer than driving.
		</p>
		<p>
			What would it look like to get to the 2028 Olympic venues today using only public transit, walking, or cycling?
			I collected travel time data to understand which venues were most accessible by public transit and 
			how the transit journeys compared to driving for Angelenos. 
		</p>

		
		<h1>Accessibility</h1>
		<p>
			How much of Los Angeles can reach the venues by transit? 
			To explore this question, I looked at the areas from which you could reach the venue within 30 mins, 1 hour, 90 mins, and 2 hours using public transit.
			Each of these areas are called isochrones, and the map below shows the isochrones for each venue.
		</p>

		<IsochroneMap {venues} {isochronesRewind} colours={colourPalette} />

		<p>
			The chart below compares the percentage of Angelenos who can reach each venue within 
			each timeframe.
		</p>

		<TravelTimeBar data={isochronesRewind.features} colours={colourPalette} />

		<p>
			While the downtown venues are somewhat accessible, nearly half the venues can't be reached within 2 hours by transit.
		</p>

		<p>
			This analysis is based on our current transit system.
			The good news is that there are a number of transit projects that are underway which are aiming to open before 2028.
			However, two key questions remain: will the projects actually get done on time? 
			And will they improve the convenience, accessibility, and safety of transit enough to make a meaningful difference for Angelenos trying to get to the venues?
		</p>

		<p>
			Transit in Los Angeles is undergoing huge improvements, but it still doesn't work for everyone. The
			problems of accessibility and safety are too much of a hurdle for many Angelenos to use public
			transit. The <a
				href="https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A"
				>LABarometer surveys</a
			> illustrate these challenges and reveal the dramatic disparities in convenience and safety between
			cars and public transit. Despite LA being notorious for its traffic, over 70% of respondents said
			driving is convenient for both commuting and personal trips, while fewer than 30% said the same
			about Metro rail and only 16% for buses. Safety perceptions show an even more pronounced divide:
			74% of Angelenos feel safe while driving, while less than half feeling secure on public transit.
			LA's current transit system is falling significantly short of meeting passengers’ fundamental needs
			for efficient and secure transportation.
		</p>

		<SurveyCharts />

		


		

		<p>
			The gulfs between Olympic ambitions and transit reality raises questions about how LA will
			transform its transportation system, and whether changes made for the Games will leave a
			lasting impact on the city's mobility. Indeed, one of the four objectives of the LA 2028
			Transport Strategy is to change residents' transit behaviors and encourage broader use of LA's
			transit system "before, during, and after the Games."
		</p>
		<p>
			There is a lot of work being done to improve our transit system before 2028, most notably the
			expansion of the D Line towards UCLA and multiple bus rapid transit routes. But there will
			also be plenty of temporary solutions in place for the Games, including dedicated Olympic
			lanes and shuttle services. However, these solutions are not a long-term fix for the city's
			transit system and are unlikely to achieve the behaviour change the Transport Strategy is
			seeking.
		</p>

		<p>
			It is also concerning how priorities have shifted since the original Olympics bid back in
			2014. Of the eight transportation projects originally listed in the bid that were expected to
			be completed by 2024, only one has been completed. Since 2018, Metro has substituted 11 of the
			original 28 infrastructure projects with ones deemed more achievable by 2028. In fact, three
			of the replacement projects were already completed when the list was revised, suggesting a
			focus on meeting numerical targets rather than transforming the city's transit system. This
			track record raises concerns about whether the remaining projects will be ready for the Games.
		</p>
		<p>
			LA's Olympic transportation plan includes numerous temporary solutions—dedicated Olympic
			lanes, supplementary shuttle services, and adjusted schedules—that will likely ensure smooth
			operations during the Games. However, these temporary fixes mask a deeper challenge: the
			long-term health of LA's public transit system.
		</p>

		<h2>Methodology</h2>
		<p class="mb-4 font-mono text-sm text-gray-500">
			You can explore the code for this project <a href="https://github.com/MokeEire/la28-r"
				>here on GitHub</a
			>.
		</p>
		<p>
			The goal of this analysis was to explore how accessible LA's proposed Olympic venues are by
			public transit. I used an isochrone API from TravelTime to identify what areas of Los Angeles
			could reach each venue within different time frames and used census data to estimate how many
			people live in those areas. To do this, I followed these steps:
		</p>
		<ol>
			<li>Collect and geocode the venues</li>
			<li>Generate isochrones for each venue using the TravelTime API</li>
			<li>Join population to the isochrones</li>
		</ol>
		<h3>Collect and geocode the venues</h3>
		<p>
			I gathered the list of Olympic venues from the <a
				href="https://la28.org/en/games-plan/venues.html">official LA 2028 website</a
			>
			and entered the data into Google Sheets. To geocode the venues, I used the
			<a href="https://jessecambon.github.io/tidygeocoder/">tidygeocoder</a> package in R.
		</p>
		<h3>Generate the isochrones</h3>
		<p>
			I generated isochrones for each venue using the <a
				href="https://docs.traveltime.com/api/overview/introduction">TravelTime API</a
			>, which provides travel time data for public transit routes. I prepared API queries for each
			venue and timeframe (30, 60, 90, and 120 minutes) using the
			<a href="https://github.com/traveltime-dev/traveltime-sdk-r">timetravelR</a> package in R. I specified
			public transit as the travel mode, used the "fastest" routing profile, and increased the allowable
			walking time at the start and end of the journey from 10 to 20 minutes.
		</p>
		<h3>Join population data to the isochrones</h3>
		<p>
			I retrieved census tract population and spatial data for Los Angeles County from NHGIS. The
			latest data available is from 2020. If a census tract was within or touched an isochrone, I
			considered the population of that tract to be able to access the venue within the given
			timeframe. While this isn't perfect (e.g. only a small portion of the census tract might
			overlap with isochrone), it is a close approximation. To be more precise, one could go to the
			block level.
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
