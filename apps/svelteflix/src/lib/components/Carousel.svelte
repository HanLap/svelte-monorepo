<script lang="ts">
	import { media } from '$lib/api';
	import type { MovieListResult } from '$lib/types';
	import type { View } from '$lib/views';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	export let movies: MovieListResult[];
	export let view: View;
	export let href: string;

	let carousel: HTMLDivElement;

	let scrollLeft = 0;

	onMount(() => {
		const scroll = (e: WheelEvent) => {
			e.preventDefault();
			carousel.scrollBy({
				left: e.deltaY,
				behavior: 'smooth',
			});
		};

		// carousel.addEventListener('wheel', scroll);

		return () => {
			carousel.removeEventListener('wheel', scroll);
		};
	});

	const handle_scroll = (e: Event) => {
		scrollLeft = (e.target as HTMLDivElement).scrollLeft;
	};
</script>

<h2 class="column">
	{view.title}
	{#if href} <a {href}>See all</a> {/if}
</h2>

<div class="container column">
	<div bind:this={carousel} class="carousel" on:scroll={handle_scroll}>
		{#each movies as movie}
			<a href="/movies/{movie.id}">
				<img alt={movie.title} src={media(movie.poster_path, 500)} />
			</a>
		{/each}
	</div>
	{#if scrollLeft > 0}
		<button
			class="scroll_left"
			on:click={() => {
				carousel.scrollBy({
					left: -(carousel.clientWidth - carousel.children[0].clientWidth),
					behavior: 'smooth',
				});
			}}
			in:slide={{ axis: 'x', duration: 200 }}
			out:slide={{ axis: 'x', duration: 100 }}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><title>chevron-left</title><path
					fill="currentColor"
					d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
				/></svg
			>
		</button>
	{/if}

	{#if scrollLeft < carousel?.scrollWidth - carousel?.clientWidth}
		<button
			class="scroll_right"
			on:click={() => {
				carousel.scrollBy({
					left: carousel.clientWidth - carousel.children[0].clientWidth,
					behavior: 'smooth',
				});
			}}
			in:slide={{ axis: 'x', duration: 200 }}
			out:slide={{ axis: 'x', duration: 100 }}
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<title>chevron-right</title>
				<path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
			</svg>
		</button>
	{/if}
</div>

<style>
	h2 {
		margin-bottom: 1rem;
	}

	h2 a {
		color: var(--accent);
	}

	h2 a:visited {
		color: var(--accent);
	}

	.container {
		width: 100%;
		max-width: var(--column);
		overflow: hidden;
		margin-bottom: 1rem;
	}

	.carousel {
		display: flex;
		height: 20rem;
		overflow-x: scroll;
		overflow-y: hidden;

		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		white-space: nowrap;
		overscroll-behavior-x: contain;
		scroll-padding-left: var(--padding);
		gap: 1rem;
	}

	.carousel::-webkit-scrollbar {
		display: none;
	}

	img {
		height: 100%;
	}

	button {
		position: absolute;
		top: 0;
		height: 100%;
		width: 5em;
		z-index: 100;
		background: none;
		border: none;
		color: var(--accent);
		cursor: pointer;
		filter: drop-shadow(0 0 0.5rem black);
	}

	.scroll_left {
		background: linear-gradient(to right, black, transparent);
		left: 0;
	}

	.scroll_right {
		background: linear-gradient(to left, black, transparent);
		right: 0;
	}
</style>
