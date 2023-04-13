import { db } from '$lib/server/db';
import { error, fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const maschine = await db.maschine.findFirst({
		where: {
			id: params.maschineId,
		},
	});

	if (!maschine) {
		throw error(404, "Not Found");
	}

	return {
		maschine,
	};
}

export const actions = {
	async delete({ params }) {
		const id = params.maschineId;

		if (!id) {
			return fail(400, {
				missing: {
					id: true,
				},
			});
		}

		try {
			const maschine = await db.maschine.delete({
				where: { id },
			});
		} catch (e) {
			return fail(404, { notFound: true });
		}

		throw redirect(303, '..');
	},
};
