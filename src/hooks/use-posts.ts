import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/api/posts';

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
};

export const usePosts = () =>
	useQuery({
		queryKey: postKeys.lists(),
		queryFn: getPosts,
		staleTime: 5 * 60 * 1000,
	});
