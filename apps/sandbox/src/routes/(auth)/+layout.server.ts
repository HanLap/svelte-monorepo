import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
	const session = (await parent()).session;
	const user = session.user;
	const { email, name } = user;

	if (!user || !email || !name) {
		throw redirect(303, '/');
	}

}
