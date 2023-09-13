import { createComment, getComments } from '$lib/server/commentService';
import { getPost, likePost, unlikePost } from '$lib/server/postService';
import { getOrCreateUser, getUser } from '$lib/server/userService';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const session = (await parent()).session;

	const user = session?.user?.email ? await getUser({ email: session.user.email}) : undefined;

	const postId = parseInt(params.post_id);

	const post = await getPost(postId, user ?? undefined);
	const comments = await getComments(postId);

	return {
		post,
		comments,
	};
}

export const actions = {
	like: async ({ params, locals }) => {
		const session = await locals.getSession();

		if (!session?.user?.email) {
			throw redirect(303, '/');
		}

		const user = await getOrCreateUser(session.user);

		if (!user) {
			throw redirect(303, '/');
		}

		return likePost(parseInt(params.post_id), user);
	},
	unlike: async ({ params, locals }) => {
		const session = await locals.getSession();

		if (!session?.user?.email) {
			throw redirect(303, '/');
		}

		const user = await getOrCreateUser(session.user);

		if (!user) {
			throw redirect(303, '/');
		}

		return unlikePost(parseInt(params.post_id), user);
	},
	comment: async ({ params, locals, request }) => {
		const session = await locals.getSession();
		const data = await request.formData();
		const content = data.get('content') as string;

		if (!session?.user?.email) {
			throw redirect(303, '/');
		}

		const user = await getOrCreateUser(session.user);

		if (!user) {
			throw redirect(303, '/');
		}

		if (!content) {
			return fail(400, { noContent: true });
		}

		return createComment({ postId: parseInt(params.post_id), user, content });
	},
};
