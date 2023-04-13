<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { Maschine } from '@prisma/client';

	export let maschinen: Maschine[];
</script>

<div class="overflow-x-auto">
	<div class="flex justify-between">
		<div>Maschinen</div>

		<a
			class="text-2xl font-bold"
			color="blue"
			href="/szenarios/{$page.params.szenarioId}/stammdaten/maschinen/new/"
		>
			+
		</a>
	</div>
	<table class="table">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Rüstzeit</th>
				<th>Kosten/Minute</th>
			</tr>
		</thead>
		<tbody>
			{#each maschinen as maschine}
				{@const active = $page.params.maschineId === maschine.id}
				<tr
					on:click={() =>
						goto(`/szenarios/${$page.params.szenarioId}/stammdaten/maschinen/${maschine.id}`)}
					class={'cursor-pointer ' + (active ? '!bg-blue-200' : '')}
				>
					<td class="break-all max-[10rem]">{maschine.id}</td>
					<td>{maschine.name}</td>
					<td>{maschine.ruestzeit}</td>
					<td>{maschine.kostenMinute}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<!-- {/await} -->
</div>
