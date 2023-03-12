<script lang="ts">
	import { formatTimePast } from '$lib/util/dateUtils';
	import type { Comment, User } from '@prisma/client';
	import { Avatar, Card } from 'flowbite-svelte';

	export let comment: Comment & { author: User };
</script>

<Card>
	<div class="flex space-x-1 items-center mb-2 justify-between">
		<a class="flex items-center space-x-1 hover:underline" href="/user/{comment.author.username}">
			<Avatar src={comment.author.image ?? undefined} size="xs" />
			<div class="text-sm font-light">{comment.author.name}</div>
		</a>
		<div class="font-thin text-sm">{formatTimePast(comment.author_date)}</div>
	</div>
	{comment.content}
</Card>
