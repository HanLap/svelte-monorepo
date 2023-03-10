<script lang="ts">
	import NewPost from './NewPost.svelte';
	import Post from './Post.svelte';

	export let data;
	export let form;

	$: ({ user, posts } = data);
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

{#if form?.incorrect}
	<p>User does not exist!</p>
{/if}

<div>
	{#if user}
		{@const { id, name, email } = user}
		<div>
			<span>{id}</span>
			<span>{name}</span>
			<span>{email}</span>
		</div>
	{/if}
</div>

<h2 class="text-3xl font-bold text-zinc-700">new Post</h2>
<NewPost />

<h2 class="text-3xl font-bold text-zinc-700">Posts</h2>
<div>
	{#each posts as post}
		<Post {post} />
	{/each}
</div>
