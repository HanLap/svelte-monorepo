<script lang="ts">
	import { page } from '$app/stores';
	import type { LayoutServerData } from './$types';
	import Overview from './Overview.svelte';

	export let data: LayoutServerData;

	$: view = $page.url.searchParams.get('view') as
		| 'maschinen'
		| 'mitarbeiter'
		| 'material'
		| 'produkte'
		| 'chargen'
		| 'arbeitsschritte';
</script>

<Overview {data} />
