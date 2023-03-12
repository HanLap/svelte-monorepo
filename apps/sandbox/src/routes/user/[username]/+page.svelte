<script lant="ts">
	import { Avatar } from 'flowbite-svelte';
	import Post from '$lib/components/Post.svelte';
	import { formatMonthYear } from '$lib/util/dateUtils';

	export let data;

	$: ({ user, posts } = data);
</script>

<section class="mb-4">
	<div class="flex">
		<Avatar src={user.image ?? undefined} size="xl" />
		<div class="pl-4 pt-2 flex flex-col">
			<div class="text-4xl font-semibold">{user.name}</div>
			<div class="flex items-baseline justify-between">
				<div class="text-xl">@{user.username}</div>
				<div class="text-sm">joined {formatMonthYear(user.creation_date)}</div>
			</div>
			<div>{user.biography ?? ''}</div>
		</div>
	</div>
</section>
<section class="flex flex-col items-stretch space-y-2 pl-3">
	{#each posts as post}
		<Post {post} />
	{/each}
</section>
