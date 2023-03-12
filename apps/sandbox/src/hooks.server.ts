import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import { createUser, getOrCreateUser } from '$lib/server/userService';
import { error, type Handle } from '@sveltejs/kit';

export const handle = SvelteKitAuth({
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			const { email, name, image } = user;
			if (!email) {
				return false;
			}

			await createUser({ email, name, image });

			return true;
		},
		async session({ session }) {
			if (!session.user) {
				throw error(400);
			}

			const u = await getOrCreateUser(session.user);

			if (!u) {
				throw error(400);
			}

			session.user = u;
			return session;
		},
	},
}) satisfies Handle;
