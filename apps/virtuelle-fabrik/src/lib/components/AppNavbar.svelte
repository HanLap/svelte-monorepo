<script lang="ts">
	import { page } from '$app/stores';

	$: inSzenario = $page.params.szenarioId !== undefined;

	let active: 'home' | 'stammdaten' | 'editor' | 'ergebnisse' = 'home';
	$: {
		const checkPath = (str: string) => $page.url.pathname.includes(str);

		if (checkPath('stammdaten')) {
			active = 'stammdaten';
		} else if (checkPath('editor')) {
			active = 'editor';
		} else if (checkPath('ergebnisse')) {
			active = 'ergebnisse';
		} else {
			active = 'home';
		}
	}
</script>

<div class="navbar bg-base-100">
	<div class="navbar-start">
		<a href="/">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				Virtuelle Fabrik
			</span>
		</a>
	</div>
	<div class="navbar-center flex">
		<ul class="menu menu-horizontal">
			<li class:bordered={active === 'home'}><a href="/">Home</a></li>
			{#if inSzenario}
				<li class:bordered={active === 'stammdaten'}>
					<a href="/szenarios/{$page.params.szenarioId}/stammdaten">Stammdaten</a>
				</li>
				<li class:bordered={active === 'editor'}>
					<a href="/szenarios/{$page.params.szenarioId}/editor">Editor</a>
				</li>
				<li class:bordered={active === 'ergebnisse'}>
					<a href="/szenarios/{$page.params.szenarioId}/ergebnisse">Ergebnisse</a>
				</li>
			{/if}
		</ul>
	</div>
	<div class="navbar-end" />
</div>
