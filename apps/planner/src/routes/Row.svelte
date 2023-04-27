<script lang="ts">
	import type { Plan } from '$lib/models/Plan';
	import type { Task } from '$lib/models/Task';
	import { getTaskSteps } from '$lib/taskUtil';

	export let task: Task;
	export let i: number;
	export let currentWeek: number;
	export let plan: Plan;

	$: idPrefix = `tasks[${i}]`;

	const cellStyle = 'border-y border-gray-400 p-0 text-right';

    $: console.log(task, i, currentWeek, plan);
</script>

<input name="{idPrefix}.id" hidden value={task.id} />
<td class="deleteButton opacity-0 transition-opacity duration-500 hover:brightness-110">
	<button class="mx-1 text-gray-400 w-4" formaction="?/deleteTask&id={task.id}">
		<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
			<title>delete</title>
			<path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
		</svg>
	</button>
</td>
<td class="{cellStyle} w-48 min-w-min">
	<input name="{idPrefix}.name" class="w-48 px-1 bg-transparent" bind:value={task.name} />
</td>
<td class={cellStyle}>
	<input
		name="{idPrefix}.plannedStart"
		class="w-10 text-right px-1 bg-transparent"
		type="number"
		bind:value={task.plannedStart}
	/>
</td>
<td class={cellStyle}>
	<input
		name="{idPrefix}.plannedEnd"
		class="w-10 text-right px-1 bg-transparent"
		type="number"
		bind:value={task.plannedEnd}
	/>
</td>
<td class={cellStyle}>
	<input
		name="{idPrefix}.actualStart"
		class="w-10 text-right px-1 bg-transparent"
		type="number"
		bind:value={task.actualStart}
	/>
</td>
<td class="{cellStyle} border-r">
	<input
		name="{idPrefix}.actualEnd"
		class="w-10 text-right px-1 bg-transparent"
		type="number"
		bind:value={task.actualEnd}
	/>
</td>
{#each getTaskSteps(task, currentWeek, plan.start, plan.end) as step}
	<td
		class="{cellStyle} font-semibold"
		colspan={step.weeks}
		class:isGood={step.type === 'EARLY'}
		class:isPlanned={step.type === 'EXPECTED'}
		class:isBad={step.type === 'LATE'}
	/>
{/each}

<style lang="postcss">


	td.isGood {
		@apply bg-green-100;
	}

	td.isBad {
		@apply bg-gradient-to-r from-green-100 via-orange-200 to-orange-300;
	}

	td.isPlanned {
		@apply bg-gradient-to-r from-green-300 to-green-200;
	}
</style>
