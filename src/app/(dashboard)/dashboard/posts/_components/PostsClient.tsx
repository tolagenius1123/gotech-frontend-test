'use client';

import { usePosts } from '@/hooks/use-posts';
import { DataTable } from '@/components/data-table/DataTable';
import { columns } from './columns';
import TableSkeleton from '@/components/data-table/TableSkeleton';

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

	if (isLoading) return <TableSkeleton />;
	if (isError) return <ErrorState message={(error as Error).message} />;

	return <DataTable columns={columns} data={posts ?? []} />;
}
