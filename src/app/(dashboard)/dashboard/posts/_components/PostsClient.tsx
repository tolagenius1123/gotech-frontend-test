'use client';

import { useState, useMemo, useCallback } from 'react';
import { PlusIcon, SearchIcon } from 'lucide-react';

import { usePosts } from '@/hooks/use-posts';
import { useDebounce } from '@/hooks/use-debounce';
import { DataTable } from '@/components/data-table/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TableSkeleton from '@/components/data-table/TableSkeleton';
import { columns } from './columns';
import { AddPostDialog } from './AddPostDialog';

function ErrorState({ message }: { message: string }) {
	return (
		<div className="rounded-md border border-red-200 bg-red-50 px-6 py-10 text-center">
			<p className="text-sm font-medium text-red-600">Failed to load posts</p>
			<p className="mt-1 text-xs text-red-400">{message}</p>
		</div>
	);
}

export function PostsClient() {
	const { data: posts, isLoading, isError, error } = usePosts();
	const [searchTerm, setSearchTerm] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);

	const debouncedSearch = useDebounce(searchTerm, 300);

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}, []);

	const filteredPosts = useMemo(() => {
		if (!posts) return [];
		if (!debouncedSearch.trim()) return posts;

		const term = debouncedSearch.toLowerCase();
		return posts.filter(
			(post) =>
				post.title.toLowerCase().includes(term) || post.body.toLowerCase().includes(term)
		);
	}, [posts, debouncedSearch]);

	if (isLoading) return <TableSkeleton />;
	if (isError) return <ErrorState message={(error as Error).message} />;

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-4">
				<div className="relative w-full max-w-sm">
					<SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input
						placeholder="Search posts..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="pl-8 h-10 bg-white"
					/>
				</div>
				<Button
					className="bg-gotech-primary py-5 px-3 cursor-pointer"
					onClick={() => setDialogOpen(true)}
				>
					<PlusIcon />
					Add Post
				</Button>
			</div>

			<DataTable columns={columns} data={filteredPosts} />

			<AddPostDialog open={dialogOpen} onOpenChange={setDialogOpen} />
		</div>
	);
}
