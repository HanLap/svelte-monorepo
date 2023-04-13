<script lang="ts">
	import AppNavbar from '$lib/components/AppNavbar.svelte';
	import '../app.css';
	import { page } from '$app/stores';
	import { setContext } from 'svelte';


</script>

<AppNavbar />

<main>
	<slot />
</main>
