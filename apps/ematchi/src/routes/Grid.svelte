<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Square from './Square.svelte';

	export let grid: string[];
	export let found: string[];

	const dispatch = createEventDispatcher();

	let a = -1;
	let b = -1;
	let reset_timeout: number;
	

	export function reset() {
		a = b = -1;
	}
</script>

<div class="grid">
	{#each grid as emoji, i}
		{@const flipped = a === i || b === i}
		<Square
			{emoji}
			on:click={() => {
				clearTimeout(reset_timeout);

				if (a === -1 && b === -1) {
					a = i;
				} else if (b === -1) {
					if (a === i) return;

					b = i;
					if (grid[a] === grid[b]) {
						dispatch('found', { emoji });
					} else {
						reset_timeout = setTimeout(() => {
							a = -1;
							b = -1;
						}, 1000);
					}
				} else {
					b = -1;
					a = i;
				}
			}}
			{flipped}
			found={found.includes(emoji)}
			group={grid.indexOf(emoji) === i ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		height: 100%;
		grid-gap: 0.5em;
		perspective: 100vw;
	}
</style>
