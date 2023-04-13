<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Card, FloatingLabelInput, Input } from 'flowbite-svelte';

	export let data;
</script>

<form method="post" use:enhance>
	<div class="p-4 flex flex-wrap gap-4">
		{#each data.szenarios as szenario}
			<a
				href="/szenarios/{szenario.id}/"
				class="card bg-base-300 shadow-xl w-56 h-40 flex flex-col justify-center items-center hover:bg-base-200"
			>
				<h1 class="text-2xl font-semibold">{szenario.name}</h1>
			</a>
		{/each}

		<div class="card bg-base-300 w-56 h-40 shadow-xl p-3">
			<input
				name="name"
				type="text"
				placeholder="Neues Szenario"
				required
				class="input input-bordered input-primary"
			/>
			<button type="submit" class="btn btn-primary mt-auto">Create</button>
		</div>
	</div>
</form>
