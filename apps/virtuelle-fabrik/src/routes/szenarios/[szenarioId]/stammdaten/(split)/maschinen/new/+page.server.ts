import { db } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

const schema = zfd.formData({
	name: zfd.text(),
	ruestzeit: zfd.numeric(),
	kostenMinute: zfd.numeric(),
	ausfallWahrscheinlichkeit: zfd.numeric(),
	mitarbeiterMin: zfd.numeric(),
	mitarbeiterMax: zfd.numeric(),
	befaehigungen: zfd.repeatable(
		z
			.array(
				zfd.formData({
					schrittId: zfd.text(),
					taktrate: zfd.numeric(),
				})
			)
			.default([])
	),
});

export const actions = {
	async default({ request, params }) {
		const result = schema.safeParse(await request.formData());

		if (!result.success) {
			return fail(400, { ...result.error.issues });
		}

		const newMaschine = result.data;

		const szenarioId = parseInt(params.szenarioId);

		if (!szenarioId) {
			return fail(400, { szenarioId: 'missing' });
		}

		const m = await db.maschine.create({
			data: {
				...newMaschine,
				szenarioId,
				befaehigungen: {
					create: newMaschine.befaehigungen,
				},
			},
		});

		throw redirect(303, `./${m.id}`);
	},
};
