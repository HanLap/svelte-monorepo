<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import { fade } from 'svelte/transition';
	import Comment from './Comment.svelte';
	import NewComment from './NewComment.svelte';
	import { flip } from 'svelte/animate';

	export let data;

	$: ({ post, comments } = data);
</script>

<div class="mb-4">
	{#if post}
		<Post {post} />
	{/if}
</div>

<section>
	<h2 class="text-2xl font-semibold text-gray-600 mb-2">Comments</h2>

	<NewComment />

	<div class="mt-1 flex flex-col items-stretch space-y-1">
		{#each comments as comment (comment.id)}
			<div in:fade animate:flip={{ duration: 300 }}>
				<Comment {comment} />
			</div>
		{/each}
	</div>
</section>

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
		}
	}

	section {
		view-transition-name: comment-section;
	}

	h2 {
		view-transition-name: comment-header;
	}

	:root::view-transition-new {
		animation-duration: 300ms;
		animation-timing-function: ease-in-out;
	}

	:root::view-transition-new(comment-section),
	:root::view-transition-new(comment-header) {
		animation: 500ms ease-in-out 100ms both fade-in;
	}
</style>
