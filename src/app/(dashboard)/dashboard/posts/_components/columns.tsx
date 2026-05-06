'use client';

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';

import type { Post } from '@/types';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';

function ViewPostCell({ post }: { post: Post }) {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<div className="flex items-center gap-1">
				<Button
					className="cursor-pointer"
					variant="ghost"
					size="icon-sm"
					onClick={() => setOpen(true)}
				>
					<EyeIcon />
					<span className="sr-only">View post</span>
				</Button>
				<Button className="cursor-pointer" variant="ghost" size="icon-sm">
					<PencilIcon />
					<span className="sr-only">Edit post</span>
				</Button>
				<Button
					className="cursor-pointer text-destructive hover:text-destructive"
					variant="ghost"
					size="icon-sm"
				>
					<Trash2Icon />
					<span className="sr-only">Delete post</span>
				</Button>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className="capitalize pr-6">{post.title}</DialogTitle>
						<DialogDescription>Post {post.id}</DialogDescription>
					</DialogHeader>
					<p className="text-sm text-foreground leading-relaxed">{post.body}</p>
				</DialogContent>
			</Dialog>
		</>
	);
}

export const columns: ColumnDef<Post>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => (
			<span className="font-mono text-xs text-gray-400">{row.getValue('id')}</span>
		),
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => (
			<span className="block max-w-50 truncate capitalize font-medium text-gray-500">
				{row.getValue('title')}
			</span>
		),
	},
	{
		accessorKey: 'body',
		header: 'Description',
		cell: ({ row }) => (
			<span className="block max-w-[320px] truncate text-gray-500">
				{row.getValue('body')}
			</span>
		),
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ViewPostCell post={row.original} />,
	},
];
