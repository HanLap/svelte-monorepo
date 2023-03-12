// since there's no dynamic data here, we can prerender

import { redirect } from '@sveltejs/kit';

// it so that it gets served as a static asset in production
export const prerender = true;

export async function load({parent}) {
    const session = (await parent()).session;

    if (session) {
        throw redirect(303, "/posts")
    }
}