<script lang="ts">
	import { receive } from './transitions';
	import { get_twemoji_url } from './utils';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji (emoji)}
		<div class="pair">
			<img alt={emoji} src={get_twemoji_url(emoji)} in:receive={{ key: `${emoji}a` }} />
			<img alt={emoji} src={get_twemoji_url(emoji)} in:receive={{ key: `${emoji}b` }} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		height: 100%;
		gap: 0.5em;
		filter: drop-shadow(0.2em 0.2em 0.5em #ddd);
	}

	.pair {
		width: 4em;
		height: 4em;

		background: white;
		padding: 1em;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		position: absolute;
		width: 2em;
		height: 2em;
	}
</style>
