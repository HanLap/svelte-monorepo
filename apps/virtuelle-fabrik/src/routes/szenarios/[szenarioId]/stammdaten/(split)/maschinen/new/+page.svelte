<script lang="ts">
	import { enhance } from '$app/forms';
	</script>

<form method="post" class="flex flex-col" use:enhance>
	<a href="../" class="btn">close</a>

	<input class="input" name="name" value="bohrmaschine" />
	<input class="input" name="ruestzeit" value="1" />

	<input class="input" name="kostenMinute" value="1" />
	<input class="input" name="ausfallWahrscheinlichkeit" value="1" />
	<input class="input" name="mitarbeiterMin" value="1" />
	<input class="input" name="mitarbeiterMax" value="1" />

	<button type="submit" class="btn">add</button>
</form>
