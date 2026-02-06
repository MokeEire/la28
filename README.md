# LA28: Transit Accessibility for the 2028 Olympics

An interactive data visualization exploring how accessible the 2028 Los Angeles Olympic venues are by public transit. LA leadership has announced that Angelenos will not be able to drive to the Games, yet the city's transit system remains a challenge for most residents. This project investigates what it would look like to reach every proposed venue using only public transit, walking, or cycling—and how much of Los Angeles is left behind.

## About the Project

Los Angeles is synonymous with car culture, yet the 2028 Olympics aim to be "no-car Games." This project examines the gap between that ambition and the current state of LA's public transit by:

- **Mapping transit accessibility** — Interactive isochrone maps show the areas that can reach each Olympic venue within 30, 60, 90, and 120 minutes by public transit. Users can select any venue and instantly see how far transit reaches across LA County.
- **Comparing venues** — A bar chart ranks all proposed venues by the share of LA County residents who can reach them within each travel-time threshold, revealing which venues are well-served and which are nearly unreachable.
- **Surfacing public opinion** — Survey data from USC's LABarometer illustrates how Angelenos perceive the convenience and safety of driving vs. public transit, highlighting the behavioral hurdles the Games' transport strategy must overcome.

### The Map in Action

The centrepiece of the project is an interactive isochrone map built with D3 and SVG. When a user selects a venue (via dropdown or by clicking a marker on the map), the map animates colour-coded isochrone polygons radiating outward from the venue, each representing a travel-time band. Census tract boundaries provide geographic context, and optional Metro rail and bus lines can be toggled on. Hovering over an isochrone or venue displays a tooltip with details such as population coverage. Below the map, a percent bar summarizes the share of residents within each time band.

## Data Sources

| Data | Source | Notes |
|---|---|---|
| **Census tracts** (population & boundaries) | [NHGIS](https://www.nhgis.org/) | 2020 Census tract-level population for Los Angeles County |
| **Isochrones** (transit travel-time polygons) | [TravelTime API](https://traveltime.com/apis/isochrones) | Generated for each venue at 30, 60, 90, and 120 min thresholds using public transit mode with a 20-min walking allowance |
| **Metro route geometries** | GTFS feeds via [`gtfs-to-geojson`](https://github.com/BlinkTagInc/gtfs-to-geojson) | Converted from LA Metro's GTFS data to GeoJSON for map overlays |
| **Survey data** | [USC LABarometer](https://uasdata.usc.edu/index.php?r=eNpLtDK0qi62MrFSKkhMT1WyLrYytFwwskuTcjKT9XISkxKL8nNTS1KLlKxrAVwnPw5A) | Public opinion on transit convenience and safety |
| **Venue list & locations** | [LA 2028 official site](https://la28.org/en/games-plan/venues.html) | Geocoded with the [tidygeocoder](https://jessecambon.github.io/tidygeocoder/) R package |

## Tech Stack

- **[SvelteKit](https://kit.svelte.dev/)** (Svelte 5) — app framework
- **[D3](https://d3js.org/)** (`d3-geo`, `d3-scale`, `d3-array`) — projections, scales, and data wrangling
- **[Turf.js](https://turfjs.org/)** — GeoJSON polygon rewinding
- **[Tailwind CSS](https://tailwindcss.com/)** — utility-first styling
- **[Netlify](https://www.netlify.com/)** — deployment

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Or open in the browser automatically
npm run dev -- --open
```

## Building for Production

```bash
npm run build

# Preview the production build locally
npm run preview
```

The project is configured to deploy on Netlify (see `netlify.toml`).

## Project Structure

```
src/
├── routes/
│   ├── +layout.svelte        # App layout
│   └── +page.svelte           # Main narrative page
├── lib/
│   ├── IsochroneMap.svelte    # Interactive isochrone map
│   ├── TravelTimeBar.svelte   # Venue comparison bar chart
│   ├── SurveyCharts.svelte    # LABarometer survey visualizations
│   ├── TransitLines.svelte    # Metro route overlay
│   ├── VenueMarkers.svelte    # Venue markers layer
│   ├── PercentBar.svelte      # Population percent bar
│   ├── LegendHTML.svelte      # Map legend
│   ├── *Tooltip.svelte        # Tooltip components
│   └── data/                  # GeoJSON & JSON data files
└── global.css                 # Global styles
```

## License

This project is for educational and research purposes.
