import { PrismaClient } from '@prisma/client';
import { fail } from '@sveltejs/kit';

export async function load({ parent }) {
	const prisma = new PrismaClient();

	try {
		const session = (await parent()).session;

		if (!session?.user?.email) {
			return {
				user: undefined,
				posts: await prisma.post.findMany({ include: { author: true } }),
			};
		}

		let user = await prisma.user.findFirst({
			where: {
				email: session.user.email,
			},
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					email: session.user.email,
					name: session.user.name,
				},
			});
		}

		const posts = await prisma.post.findMany({
			where: {
				author: user,
			},
			include: {
				author: true,
			},
		});

		return {
			user,
			posts,
		};
	} finally {
		prisma.$disconnect();
	}
}

export const actions = {
	default: async ({ request, locals }) => {
		const data = await request.formData();
		const session = await locals.getSession();

		// const email = data.get('email') as string;
		const email = session?.user?.email;
		const title = data.get('title') as string;
		const content = data.get('content') as string;
		const published = true;

		const prisma = new PrismaClient();

		if (!email) {
			return fail(401, { signin: true });
		}

		try {
			const user = await prisma.user.findFirst({
				where: {
					email,
				},
			});

			if (!user) {
				return fail(400, { email, incorrect: true });
			}

			if (!user.image || user.image !== session?.user?.image) {
				await prisma.user.update({
					data: {
						image: session?.user?.image,
					},
					where: {
						email: email,
					},
				});
			}

			await prisma.post.create({
				data: {
					title,
					content,
					published,
					author: {
						connect: { id: user.id },
					},
				},
			});
		} finally {
			prisma.$disconnect();
		}
	},
};
