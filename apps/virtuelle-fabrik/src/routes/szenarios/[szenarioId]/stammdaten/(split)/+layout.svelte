<script lang="ts">
	import type { LayoutServerData } from '../$types';
	import Overview from '../Overview.svelte';

	export let data: LayoutServerData;

	$: console.log($$slots);
</script>

<div class="lg:hidden">
	{#if $$slots.default}
		<slot />
	{:else}
		<Overview {data} />
	{/if}
</div>
<div class="hidden lg:grid grid-cols-[48.25%_3.5%_48.25%]">
	<Overview {data} />
	<div class="divider divider-horizontal w-1" />
	<div>
		<slot />
	</div>
</div>
