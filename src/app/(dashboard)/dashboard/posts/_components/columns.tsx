'use client';

import type { ColumnDef } from '@tanstack/react-table';
import type { Post } from '@/types';

export const columns: ColumnDef<Post>[] = [
	{
		accessorKey: 'id',
		header: 'User ID',
		cell: ({ row }) => (
			<span className="font-mono text-xs text-gray-400">{row.getValue('id')}</span>
		),
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => (
			<span className="capitalize font-medium text-gray-500 line-clamp-1">
				{row.getValue('title')}
			</span>
		),
	},
	{
		accessorKey: 'body',
		header: 'Description',
		cell: ({ row }) => (
			<span className="text-gray-500 line-clamp-1">{row.getValue('body')}</span>
		),
	},
];
