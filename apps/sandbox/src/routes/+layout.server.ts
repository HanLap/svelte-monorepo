import type { User } from '@prisma/client';

export async function load({ locals }) {
	const session = (await locals.getSession()) as unknown as { user: User } | undefined;

	return {
		session,
	};
}
