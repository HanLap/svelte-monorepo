<script lang="ts">
	export let provider: { signinUrl: string; callbackUrl: string; name: string };
</script>

<form action={provider.signinUrl} method="POST">
	{#if provider.callbackUrl}
		<input type="hidden" name="callbackUrl" value={provider.callbackUrl} />
	{/if}
	<button type="submit" class="button">
		<slot>Sign in with {provider.name}</slot>
	</button>
</form>
