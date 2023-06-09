<script lang="ts">
	import { enhance } from '$app/forms';
	import { debounce } from '$lib/debounce';
	import { dndzone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { scale } from 'svelte/transition';
	import { daysBetween, getCalendarWeek } from '../lib/dateUtil';
	import Row from './Row.svelte';

	export let data;

	$: plan = data.plan;

	const cellStyle = 'border-y border-gray-400 p-0 text-right';

	const currentWeek = getCalendarWeek(new Date());

	let form: HTMLFormElement;

	$: debouncedSubmit = debounce(() => form.requestSubmit(), 500);

	function handleDndConsider(e: CustomEvent<DndEvent<(typeof plan.tasks)[number]>>) {
		plan.tasks = e.detail.items;
	}
	function handleDndFinalize(e: CustomEvent<DndEvent<(typeof plan.tasks)[number]>>) {
		plan.tasks = e.detail.items;

		debouncedSubmit();
	}
</script>

<form
	method="post"
	action="?/updatePlan"
	use:enhance={() => {
		return ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<div class="mb-4 flex space-x-2">
		<div>
			<label for="start">Start:</label>
			<input
				id="start"
				name="start"
				class="w-10 text-right px-1"
				type="number"
				value={plan.start}
			/>
		</div>
		<div>
			<label for="end">End:</label>
			<input id="end" name="end" class="w-10 text-right px-1" type="number" value={plan.end} />
		</div>
		<div class="pl-5">
			<span class="font-semibold">Today:</span>
			{new Date().toLocaleDateString('de-de')}
		</div>
		{#if plan.deadline}
			<div class="pl-5">
				<span class="font-semibold">Deadline: </span>
				{new Date(plan.deadline).toLocaleDateString('de-de')}
			</div>
			<div class="pl-5">
				<span class="font-semibold">Days left:</span>
				{daysBetween(new Date(), new Date(plan.deadline))}
			</div>
		{/if}
	</div>
	<button type="submit" hidden>update</button>
</form>

<form
	bind:this={form}
	method="post"
	action="?/updateTasks"
	use:enhance={() => {
		return ({ update }) => {
			update({ reset: false });
		};
	}}
>
	<button type="submit" hidden />
	<table class="table-auto border-collaps mb-2">
		<thead>
			<colgroup span="2" />
			<colgroup span="2" />
			<tr>
				<th rowspan="1" colspan="6" />
				<th colspan={plan.end - plan.start + 1} scope="colgroup" class="border border-gray-400">
					Calendar Week
				</th>
			</tr>
			<th class="{cellStyle} border-l" />
			<th class="{cellStyle} font-semibold">Name</th>
			<th class="{cellStyle} font-semibold">Start</th>
			<th class="{cellStyle} font-semibold">End</th>
			<th class="{cellStyle} font-semibold">Start</th>
			<th class="{cellStyle} border-r pr-1 font-semibold">End</th>
			{#each Array.from({ length: plan.end - plan.start + 1 }, (_, i) => i + plan.start) as i}
				<th class="{cellStyle} px-1 font-semibold time" class:isWeek={i === currentWeek}>{i}</th>
			{/each}
		</thead>
		<tbody
			use:dndzone={{ items: plan.tasks, morphDisabled: true }}
			on:consider={handleDndConsider}
			on:finalize={handleDndFinalize}
			class="border border-gray-400"
		>
			{#each plan.tasks as task, i (task.id)}
				<tr
					class="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100"
					animate:flip={{ duration: 200 }}
					in:scale
				>
					<Row {task} {i} {currentWeek} {plan} />
				</tr>
			{/each}
		</tbody>
	</table>
	<button
		class="bg-gradient-to-r from-pink-500 to-orange-500 p-2 rounded text-gray-100"
		formaction="?/addTask"
	>
		Add Task
	</button>
</form>

<style lang="postcss">
	th.time:last-child {
		@apply border-r;
	}

	th.isWeek {
		@apply border-x-2 border-yellow-600 bg-yellow-300;
	}

	tr:hover :global(td.deleteButton) {
		@apply opacity-100;
	}
</style>
