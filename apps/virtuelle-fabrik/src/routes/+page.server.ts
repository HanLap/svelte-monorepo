import { db } from '$lib/server/db';
import { fail } from '@sveltejs/kit';

export async function load() {
	return {
		szenarios: db.szenario.findMany(),
	};
}

export const actions = {
	async default({ request }) {
		const data = await request.formData();

		const name = data.get('name') as string;

		if (!name) {
			return fail(400, { name, inalid: true });
		}

		await db.szenario.create({
			data: {
				name,
			},
		});
	},
};
