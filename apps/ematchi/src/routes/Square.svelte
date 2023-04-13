<script lang="ts">
	import { send } from './transitions';
	import { get_twemoji_url } from './utils';

	export let emoji: string;
	export let flipped: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flipped={flipped || found} class:found>
	<button on:click />

	<div class="background" />

	<div class="content">
		{#if !found}
			<img alt={emoji} src={get_twemoji_url(emoji)} out:send={{ key: `${emoji}${group}` }} />
		{/if}
	</div>
</div>

<style>
	.square {
		display: flex;
		justify-content: center;
		align-items: center;
		transform-style: preserve-3d;
		transition: transform 0.4s, opacity 0.4s;
		transform: rotateY(0deg);
	}

	.found {
		opacity: 0;
	}

	.flipped {
		transform: rotateY(180deg);
	}

	.background {
		/* background: white; */
		background: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px;
		border: 0.5em solid #eee;
		/* backface-visibility: hidden; */
		border-radius: 1em;
		width: 100%;
		height: 100%;
		position: absolute;
		pointer-events: none;
	}

	button {
		position: absolute;
		width: 100%;
		height: 100%;
		background: transparent;
		border: 0;
		border-radius: 1em;
		font-size: inherit;
	}

	.content {
		background: white;
		border: 0.5em solid #eee;
		border-radius: 1em;
		/* padding: min(2em, 10vmin); */
		padding: auto;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	img {
		width: 80%;
		height: 80%;
		pointer-events: none;
		backface-visibility: hidden;
	}
</style>
