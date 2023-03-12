import { error } from '@sveltejs/kit';
import { db } from './db';

type UserDto = {
	email?: string | null;
	name?: string | null;
	image?: string | null;
};

export async function getUser({ email, username }: { email?: string; username?: string }) {
	return db.user.findFirst({
		where: {
			email,
			username,
		},
	});
}

export async function createUser({ email, name, image }: UserDto & { email: string }) {
	return db.user.upsert({
		where: {
			email,
		},
		update: {
			name,
			image,
		},
		create: {
			email,
			name,
			image,
			username: determineUsername(email, name ?? undefined),
		},
	});
}

export async function getOrCreateUser({ email, name, image }: UserDto) {
	if (!email) {
		return undefined;
	}

	const dbUser = await getUser({ email });

	if (dbUser) {
		return dbUser;
	}

	return createUser({ email, name, image });
}

function determineUsername(email: string, name?: string) {
	if (name) {
		return name.replace(/[^A-Za-z0-9]+/, '').toLowerCase();
	}

	if (email) {
		throw error(400, '');
	}

	return email.split('@')[0].toLowerCase();
}
