import { redirect } from '@sveltejs/kit';

export async function load({ url }) {
	if (!url.searchParams.get('view')) {
		throw redirect(303, '?view=maschinen');
	}
}
