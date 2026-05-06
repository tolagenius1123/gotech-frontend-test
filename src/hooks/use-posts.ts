import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, addPost } from '@/api/posts';
import type { Post } from '@/types';
import { toast } from 'sonner';

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

export const useAddPost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: addPost,
		onSuccess: (newPost) => {
			queryClient.setQueryData<Post[]>(postKeys.lists(), (old = []) => [newPost, ...old]);
			toast.success('Post added successfully');
		},
		onError: () => {
			toast.error('Failed to add post');
		},
	});
};
