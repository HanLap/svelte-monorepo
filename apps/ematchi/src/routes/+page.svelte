<script lang="ts">
	import { onMount } from 'svelte';
	import '../styles.css';
	import Game from './Game.svelte';
	import Modal from './Modal.svelte';
	import { levels } from './levels';
	import { confetti } from '@neoconfetti/svelte';

	let state: 'waiting' | 'playing' | 'paused' | 'won' | 'lost' = 'waiting';

	let game: Game;

	function toggleDarkMode(state?: boolean) {
		if (state !== undefined) {
			window.document.body.classList.toggle('darkmode');
			return;
		}

		window.document.body.classList.toggle('darkmode', state);
	}

	onMount(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			toggleDarkMode(true);
		}

		function listenDarkmode(e: any) {
			toggleDarkMode(e.matches);
		}

		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', listenDarkmode);

		return () => {
			window
				.matchMedia('(prefers-color-scheme: dark)')
				.removeEventListener('change', listenDarkmode);
		};
	});
</script>

<button class="darkmode-toggle" on:click={() => toggleDarkMode()}>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
		<title>brightness-5</title>
		<path
			d="M12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6A6,6 0 0,1 18,12A6,6 0 0,1 12,18M20,15.31L23.31,12L20,8.69V4H15.31L12,0.69L8.69,4H4V8.69L0.69,12L4,15.31V20H8.69L12,23.31L15.31,20H20V15.31Z"
			fill="white"
		/>
	</svg>
</button>

<Game
	bind:this={game}
	on:win={() => (state = 'won')}
	on:lose={() => (state = 'lost')}
	on:pause={() => (state = 'paused')}
	on:stop={() => (state = 'waiting')}
/>

{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerWidth,
			stageHeight: innerHeight
		}}
	/>
{/if}

{#if state !== 'playing'}
	<Modal>
		<div class="container">
			<header>
				<h1>e<span>match</span>i</h1>
				<p>the emoji matching game</p>
			</header>

			{#if state === 'won' || state === 'lost'}
				<p>you {state} the game!</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else if state === 'waiting'}
				<p>chose a level</p>
			{/if}

			<div class="buttons">
				{#if state === 'paused'}
					<button
						on:click={() => {
							game.resume();
							state = 'playing';
						}}
					>
						resume
					</button>
					<button
						on:click={() => {
							game.stop();
							state = 'waiting';
						}}
					>
						quit
					</button>
				{:else}
					{#each levels as level}
						<button
							on:click={() => {
								game.start(level);
								state = 'playing';
							}}
						>
							{level.label}
						</button>
					{/each}
				{/if}
			</div>
		</div>
	</Modal>
{/if}

<style>
	.darkmode-toggle {
		position: absolute;
		top: 0.1em;
		right: 0.1em;
		color: white;
		border: none;
		cursor: pointer;
		z-index: 1000;
		padding: 0.5em;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.darkmode-toggle svg {
		width: 1em;
		height: 1em;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		font-size: 4em;
	}

	h1 span {
		color: var(--primary);
	}

	p {
		font-family: Grandstander;
	}

	button {
		font-size: 1.2em;
		font-family: Grandstander;
		color: white;
		padding: 0.5em 1em;
		margin: 0.5em;
		/* border: 1px solid black; */
		border: none;
		border-radius: 0.5em;
		cursor: pointer;
		background: var(--primary);
	}

	button:hover {
		filter: brightness(1.2);
	}

	.confetti {
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
