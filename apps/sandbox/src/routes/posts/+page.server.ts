import { createPost, getPosts } from '$lib/server/postService';
import { getUser } from '$lib/server/userService';
import { fail } from '@sveltejs/kit';

export async function load({ parent }) {
	const session = (await parent()).session;


	return {
		posts: await getPosts(session?.user ?? undefined),
	};
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const session = await locals.getSession();

		const email = session?.user?.email;
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const published = true;

		if (!email) {
			return fail(401, { signin: true });
		}

		const user = await getUser({email});

		if (!user) {
			return fail(400, { email, incorrect: true });
		}

		await createPost({ title, content, published, user });
	},
};
