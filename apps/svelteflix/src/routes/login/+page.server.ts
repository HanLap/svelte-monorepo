import { supabase } from '$lib/server/supabase';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	async login({ request, cookies, url }) {
		const formData = await request.formData();

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			return fail(error.status ?? 500, {
				message: error.message,
			});
		}

		if (data.session) {
			cookies.set('supabase.auth.token', data.session.access_token);
		}

		throw redirect(303, url.searchParams.get('redirect_to') ?? '/');
	},
};
