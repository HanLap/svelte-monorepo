<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
    <title>Project Planner</title>
    <meta name="description" content="Tool to create GANT charts">
</svelte:head>

<div class="h-screen min-w-fit bg-gradient-to-tr from-gray-50 via-gray-200 to-gray-50 p-5 text-gray-700">
	<slot />
</div>
