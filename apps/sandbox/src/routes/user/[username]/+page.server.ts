import { getPosts } from '$lib/server/postService';
import { getUser } from '$lib/server/userService';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const user = await getUser({ username: params.username });

	if (!user) {
		throw redirect(303, '/');
	}

	const posts = await getPosts(user);

	return {
		user,
		posts,
	};
}
