<script lang="ts">
	import ResultsPage from '$lib/components/ResultsPage.svelte';

	export let data;
</script>

<div class="column">
	<h1>Search</h1>

	<form>
		<input type="text" name="query" value={data.query} autocomplete="off" spellcheck="false" />
	</form>

	{#if data.query}
		<ResultsPage movies={data.movies} next={null} />
	{/if}
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	form {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 1em 0;
	}

	input {
		font-family: inherit;
		font-size: 2em;
		padding: 0.5em;
		width: 80%;
		/* background: rgba(255, 255, 255, 0.1); */
		background: transparent;
		border: none;
		border-radius: 0.25rem;
		border-bottom: solid 2px #666;
		color: white;
		transition: border-bottom 0.1s ease;
	}

	input:focus-visible {
		outline: none;
		border-bottom: solid 3px var(--accent);
	}
</style>
