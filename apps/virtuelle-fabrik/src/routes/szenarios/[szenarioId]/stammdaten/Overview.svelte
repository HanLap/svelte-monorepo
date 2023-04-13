<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
	import MaschinenTable from './(split)/maschinen/MaschinenTable.svelte';

	export let data: LayoutServerData;

	$: view = $page.url.searchParams.get('view') as
		| 'maschinen'
		| 'mitarbeiter'
		| 'material'
		| 'produkte'
		| 'chargen'
		| 'arbeitsschritte';
</script>

<div>
	<div class="bg-base-300 h-28 flex flex-col">
		<h1 class="text-2xl font-semibold m-4">Stammdaten</h1>
		<div class="mt-auto flex justify-center gap-4">
			<div class="tabs">
				<a class="tab" class:tab-active={view === 'maschinen'} href="?view=maschinen">Maschinen</a>
				<a class="tab" class:tab-active={view === 'mitarbeiter'} href="?view=mitarbeiter">Mitarbeiter</a>
				<a class="tab" class:tab-active={view === 'material'} href="?view=material">Material</a>
				<a class="tab" class:tab-active={view === 'produkte'} href="?view=produkte">Produkte</a>
				<a class="tab" class:tab-active={view === 'chargen'} href="?view=chargen">Chargen</a>
				<a class="tab" class:tab-active={view === 'arbeitsschritte'} href="?view=arbeitsschritte">
					Arbeitsschritte
				</a>
			</div>
		</div>
	</div>

	<div class="container mx-auto pt-4 max-w-4xl">
		{#if data.streamed}
			{#if view === 'maschinen'}
				{#await data.streamed.maschinen}
					...loading
				{:then maschinen}
					<MaschinenTable {maschinen} />
				{/await}
			{:else if view === 'mitarbeiter'}
				<!--  -->
			{/if}
		{/if}
	</div>
</div>
