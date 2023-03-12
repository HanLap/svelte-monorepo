<script lang="ts">
	import { Avatar, Button, Card } from 'flowbite-svelte';
	import type { Post, User } from '@prisma/client';
	import { formatTimePast } from '$lib/util/dateUtils';
	import { Icon, Heart, ArrowPathRoundedSquare, ChatBubbleBottomCenter } from 'svelte-hero-icons';
	import { enhance } from '$app/forms';

	export let post: Post & {
		author: User;
		liked_by: [];
		_count: { liked_by: number; comments: number };
	};

	$: liked = post.liked_by.length > 0;
</script>

<Card>
	<h3 class="text-xl font-bold">{post.title}</h3>
	<div class="flex space-x-1 items-center mb-2 justify-between">
		<a class="flex items-center space-x-1 hover:underline" href="/user/{post.author.username}">
			<Avatar src={post.author.image ?? undefined} size="xs" />
			<div class="text-sm font-light">{post.author.name}</div>
		</a>
		<div class="font-thin text-sm">{formatTimePast(post.author_date)}</div>
	</div>
	<div class="mb-2">{post.content}</div>
	<div class="flex justify-around">
		<form method="POST" action="/posts/{post.id}?/{liked ? 'unlike' : 'like'}" use:enhance>
			<Button size="xs" outline pill class="!p-2 border-transparent" color="blue" type="submit">
				<div class="mr-1">{post._count.liked_by}</div>
				<Icon src={Heart} size="20" solid={liked} />
			</Button>
		</form>
		<Button size="xs" outline pill class="!p-2 border-transparent" color="blue">
			<div class="mr-1">0</div>
			<Icon src={ArrowPathRoundedSquare} size="20" />
		</Button>
		<Button
			size="xs"
			outline
			pill
			class="!p-2 border-transparent"
			color="blue"
			href="/posts/{post.id}"
		>
			<div class="mr-1">{post._count.comments}</div>
			<Icon src={ChatBubbleBottomCenter} size="20" />
		</Button>
	</div>
</Card>

<style lang="postcss">
	:global(.iconButton) {
		@apply text-center font-medium inline-flex items-center justify-center px-3 py-2 text-xs text-blue-700 border border-blue-700 border-transparent;
	}
</style>
