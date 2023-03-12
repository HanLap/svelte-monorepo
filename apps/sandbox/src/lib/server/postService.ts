import type { Prisma, User } from '@prisma/client';
import { db } from './db';

type PostDto = {
	title: string;
	content?: string;
	published: boolean;
	user: User;
};

export async function createPost({ title, content, published, user }: PostDto) {
	return db.post.create({
		data: {
			title,
			content,
			published,
			author: {
				connect: { id: user.id },
			},
		},
	});
}

const postSelect = (user?: User): Prisma.PostSelect => ({
	author: true,
	liked_by: {
		where: { id: user?.id },
	},
	_count: {
		select: {
			liked_by: true,
			comments: true,
		},
	},
});

export async function getPosts(user?: User) {
	return db.post.findMany({
		include: postSelect(user),
		orderBy: {
			author_date: 'desc',
		},
	});
}

export async function getPost(id: number, user?: User) {
	return db.post.findFirst({
		where: {
			id,
		},
		include: postSelect(user),
	});
}

export async function getPostsOfUser(userId: number, user?: User) {
	return db.post.findMany({
		where: {
			id: userId,
		},
		include: postSelect(user),
		orderBy: {
			author_date: 'desc',
		},
	});
}

export async function likePost(id: number, user: User) {
	return db.post.update({
		where: {
			id,
		},
		data: {
			liked_by: {
				connect: { id: user.id },
			},
		},
	});
}

export async function unlikePost(id: number, user: User) {
	return db.post.update({
		where: {
			id,
		},
		data: {
			liked_by: {
				disconnect: { id: user.id },
			},
		},
	});
}
