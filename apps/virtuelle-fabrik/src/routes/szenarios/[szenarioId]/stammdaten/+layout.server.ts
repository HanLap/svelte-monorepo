import { db } from '$lib/server/db';

export async function load({ params }) {
	const szenarioId = parseInt(params.szenarioId);

	// const maschinen = new Promise(async (resolve) => {
	// 	const ms = await db.maschine.findMany({
	// 		where: {
	// 			szenarioId,
	// 		},
	// 	});

	// 	await new Promise((r) => setTimeout(r, 5_000));

	// 	resolve(ms);
	// }) satisfies Promise<Maschine[]>;
	const maschinen = db.maschine.findMany({
		where: {
			szenarioId,
		},
		include: {
			befaehigungen: true
		}
	});

	return {
		streamed: {
			maschinen,
		},
	};
}
