<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	import Comment from './Comment.svelte';
	import NewComment from './NewComment.svelte';

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
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</div>
</section>
