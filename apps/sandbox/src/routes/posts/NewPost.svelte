<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Textarea, Toolbar } from 'flowbite-svelte';
</script>

<form method="POST" use:enhance>
	<div class="w-96 flex flex-col items-center m-auto">
		<label for="title" hidden>Title</label>
		<label for="content" hidden>Content</label>
		<Textarea id="content" name="content" placeholder="Content...">
			<Input
				slot="header"
				id="title"
				type="text"
				name="title"
				placeholder="Title..."
				required
				class="!border-gray-300 border-dashed"
			/>
			<div slot="footer" class="flex items-center justify-between">
				<Button type="submit" color="purpleToPink" gradient>Publish post</Button>
				<Toolbar embedded />
			</div>
		</Textarea>
	</div>
</form>
