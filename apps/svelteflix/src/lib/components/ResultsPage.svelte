<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { onMount } from 'svelte';

	export let movies: MovieListResult[];
	export let next: string | null;

	let viewport: HTMLDivElement;
	let results: HTMLDivElement;
	let item_width: number;
	let item_height: number;
	let num_columns: number;

	let a = 0;
	$: b = movies.length;
	let padding_top = 0;
	let padding_bottom = 0;

	let dispatch = createEventDispatcher();

	function handle_resize() {
		const first = results.firstChild as HTMLAnchorElement;

		if (!first) return;

		item_width = first.offsetWidth;
		item_height = first.offsetHeight;
		num_columns = Number(getComputedStyle(results).getPropertyValue('--columns'));

		handle_scroll();
	}

	function handle_scroll() {
		const { scrollHeight, scrollTop, clientHeight } = viewport;

		const remaining = scrollHeight - (scrollTop + clientHeight);
		if (remaining < 400) {
			dispatch('end');
		}

		a = Math.floor(scrollTop / item_height) * num_columns;
		b = Math.ceil((scrollTop + clientHeight) / item_height) * num_columns;

		padding_top = Math.floor(a / num_columns) * item_height;
		padding_bottom = Math.floor((movies.length - b) / num_columns) * item_height;
	}

	onMount(handle_resize);
</script>

<svelte:window on:resize={handle_resize} />

<p>showing items {a} - {b}</p>
<div bind:this={viewport} class="viewport column" on:scroll={handle_scroll}>
	<div
		bind:this={results}
		class="results"
		style:padding-top="{padding_top}px"
		style:padding-bottom="{padding_bottom}px"
	>
		{#each movies.slice(a, b) as movie}
			<a class="movie" href="/movies/{movie.id}">
				<img alt={movie.title} src={media(movie.poster_path, 500)} />
			</a>
		{/each}
	</div>

	{#if next}
		<a href={next}>next page</a>
	{/if}
</div>

<style>
	.viewport {
		flex: 1;
		height: 0;
		overflow-y: auto;
		width: 100%;
	}

	.viewport::-webkit-scrollbar {
		display: none;
	}

	.results {
		--columns: 2;
		display: grid;
		grid-template-rows: 2em repeat(auto, 1fr);
		grid-template-columns: repeat(var(--columns), 1fr);
		margin: 0 -0.5rem;
	}

	.movie {
		/* width: 100%; */
		aspect-ratio: 2/3;
	}

	img {
		width: 100%;
		aspect-ratio: 2 / 3;
		height: auto;
	}

	a {
		text-decoration: none;
		color: var(--accent);
	}

	a:visited {
		color: inherit;
		color: var(--accent);
	}

	@media (min-width: 30rem) {
		.results {
			--columns: 3;
		}
	}

	@media (min-width: 40rem) {
		.results {
			--columns: 4;
		}
	}

	@media (min-width: 50rem) {
		.results {
			--columns: 5;
		}
	}

	@media (min-width: 60rem) {
		.results {
			--columns: 6;
		}
	}
</style>
