import type { User } from '@prisma/client';
import { db } from './db';

type CommentDto = {
	postId: number;
	user: User;
	content: string;
};

export async function getComments(postId: number) {
	return db.comment.findMany({
		where: {
			Post: { id: postId },
		},
		include: {
			author: true,
		},
		orderBy: {
			author_date: 'desc',
		},
	});
}

export async function createComment({ postId, user, content }: CommentDto) {
	return db.comment.create({
		data: {
			content,
			Post: { connect: { id: postId } },
			author: { connect: { id: user.id } },
		},
	});
}
