<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" action="?/login" use:enhance>
	<label for="email">Email <input name="email" placeholder="Email" /></label>
	<label for="password">Password <input name="password" placeholder="Password" /></label>

	<button>Log in</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
</style>
