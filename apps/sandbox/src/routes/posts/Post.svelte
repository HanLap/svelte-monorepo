<script lang="ts">
	import { Avatar, Card } from 'flowbite-svelte';
	import type { Post, User } from '@prisma/client';

	export let post: Post & { author: User };
</script>

<Card>
	<h3 class="text-xl font-bold">{post.title}</h3>
	<div class="flex space-x-1 items-center mb-2">
		<Avatar src={post.author.image ?? undefined} size="xs"/>
		<div class="text-sm font-light">{post.author.name}</div>
	</div>
	<div>{post.content}</div>
</Card>
