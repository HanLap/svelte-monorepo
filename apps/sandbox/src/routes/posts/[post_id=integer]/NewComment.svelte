<script lang="ts">
	import { enhance } from '$app/forms';
	import { Alert, Textarea, ToolbarButton } from 'flowbite-svelte';
	import { FaceSmile, Icon, PaperAirplane } from 'svelte-hero-icons';

	let formRef: HTMLFormElement;

	function handleKeyPress(e: KeyboardEvent) {
		console.log(e.ctrlKey, e.code)

		if (e.ctrlKey && e.code === 'Enter') {
			formRef.requestSubmit();
		}
	}
</script>

<form bind:this={formRef} method="POST" action="?/comment" use:enhance>
	<label for="chat" class="sr-only">Your message</label>
	<Alert color="dark" class="px-3 py-2 shadow">
		<svelte:fragment slot="icon">
			<ToolbarButton color="dark" class="text-gray-500 dark:text-gray-400">
				<Icon src={FaceSmile} size="20" />
				<span class="sr-only">Add emoji</span>
			</ToolbarButton>
			<Textarea id="chat" name="content" class="mx-4" rows="1" placeholder="Your comment..." on:keypress={handleKeyPress} />
			<ToolbarButton
				type="submit"
				color="blue"
				class="rounded-full text-blue-600 dark:text-blue-500"
			>
				<Icon src={PaperAirplane} size="24" />
				<span class="sr-only">Send message</span>
			</ToolbarButton>
		</svelte:fragment>
	</Alert>
</form>
