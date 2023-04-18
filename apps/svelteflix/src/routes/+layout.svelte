<script lang="ts">
	import { page } from '$app/stores';
	import '../styles.css';
	import logo from '$lib/images/svelteflix.svg';
	import tmdb from '$lib/images/tmdb.svg';

	export let data;

	$: console.log(data);
</script>

<nav class="column">
	<div class="background" />
	<a href="/">
		<img src={logo} alt="Svelteflix logo" />
	</a>

	<div class="links">
		<a href="/search">Search</a>
		{#if data.user}
			<a href="/watchlist">Watchlist</a>
		{:else}
			<a href="/login">Log in</a>
		{/if}
	</div>
</nav>

<main class:infinite={$page.data.infinite}>
	<slot />
</main>

<footer>
	Data provided by

	<a href="https://www.themoviedb.org/">
		<img class="tmdb" src={tmdb} alt="Svelteflix logo" />
	</a>
</footer>

<style>
	nav {
		width: 100%;
		max-width: var(--column);
		min-height: 4rem;
		align-items: center;
		justify-content: space-between;
		display: flex;
		top: 0;
		z-index: 20;
		background: linear-gradient(to bottom, black, transparent);
		filter: drop-shadow(0 0 1rem black) drop-shadow(0 0 1rem black);

		position: sticky;

		padding: 0 var(--side);
		color: var(--accent);
	}

	nav .background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	a {
		color: inherit;
		text-decoration: none;
	}

	img {
		height: 1rem;
	}

	.links {
		display: flex;
		gap: 1rem;
	}

	main::-webkit-scrollbar {
		display: none;
	}

	main.infinite {
		height: 0;
		flex: 1;
		overflow: hidden;
		width: 100%;
	}

	footer {
		width: 100%;
		height: 3rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		max-width: var(--column);
		padding: 0 var(--side);
		margin: 1rem auto;
	}

	.tmdb {
		height: 0.75rem;
	}
</style>
