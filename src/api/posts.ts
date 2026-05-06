import api from '@/lib/axios';
import type { Post } from '@/types';

export const getPosts = async (): Promise<Post[]> => {
	const { data } = await api.get<Post[]>('/posts');
	return data;
};

export type NewPost = Pick<Post, 'title' | 'body' | 'userId'>;

export const addPost = async (post: NewPost): Promise<Post> => {
	const { data } = await api.post<Post>('/posts', post);
	return data;
};
