<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieDetails } from '$lib/types';

	export let movie: MovieDetails;

	$: images = movie.images;

	$: backdrop = images.backdrops.find((image) => !image.iso_639_1) || images.backdrops[0];
	$: logo = images.logos.find((image) => image.iso_639_1 === 'en') || images.logos[0];
</script>

<h1 class="column">Top trending movies</h1>
<a href="/movies/{movie.id}" class="column">
	<img
		class="backdrop"
		alt={movie.title}
		src={media(backdrop.file_path, 1280)}
		style="aspect-ration: {backdrop.aspect_ratio}"
	/>
	<img
		class="logo"
		alt={movie.title}
		src={media(logo.file_path, 1280)}
		style="aspect-ration: {logo.aspect_ratio}"
	/>
</a>

<style>
	h1 {
		margin-bottom: 1rem;
	}

	a {
		display: flex;
		margin-bottom: 2rem;
	}
	.backdrop {
		width: 100%;
		max-width: 80rem;

		height: 100%;
		object-fit: cover;
	}

	.logo {
		position: absolute;
		left: 5%;
		top: 0;
		height: 100%;
		width: 30%;
		object-fit: contain;
		filter: drop-shadow(0 0 1rem black) drop-shadow(0 0 1rem black);
	}
</style>
