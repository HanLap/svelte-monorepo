<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input, Label, Textarea, Toolbar } from 'flowbite-svelte';
</script>

<form method="POST" use:enhance>
	<div>
		<div>
			<Label for="title">Title</Label>
			<Input id="title" type="text" name="title" required />
		</div>
		<div>
			<Label for="content">Content</Label>
			<Textarea id="content" name="content">
				<div slot="footer" class="flex items-center justify-between">
					<Button type="submit">Publish post</Button>
					<Toolbar embedded />
				</div>
			</Textarea>
		</div>
	</div>
</form>
