<script>
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="flex flex-col min-h-screen bg-gradient-to-bl from-slate-50 via-slate-200 to-slate-50">
	<header class="absolute left-0 right-0">
		<Header />
	</header>

	<main class="my-auto pt-20 grow container-xl mx-auto">
		<slot />
	</main>

	<footer class="text-center">
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
</div>