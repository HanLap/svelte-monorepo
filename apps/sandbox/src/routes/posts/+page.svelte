<script lang="ts">
	import { page } from '$app/stores';
	import NewPost from './NewPost.svelte';
	import Post from '$lib/components/Post.svelte';
	import { onNavigate } from '$app/navigation';

	export let data;

	$: ({ posts } = data);

	onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
        document.startViewTransition(async () => {
            resolve();
            await navigation.complete;
        });
    });
	})
</script>

<svelte:head>
	<title>Sveltter | Posts</title>
	<meta name="description" content="Sveltter Post page" />
</svelte:head>

{#if $page.data.session}
	<NewPost />
{/if}

<h2 class="text-3xl font-bold text-zinc-700">Posts</h2>
<div class="flex flex-col space-y-2 m-5">
	{#each posts as post}
		<Post {post} />
	{/each}
</div>
