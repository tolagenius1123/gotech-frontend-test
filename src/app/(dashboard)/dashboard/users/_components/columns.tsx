'use client';

import * as React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';

import type { User } from '@/types';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';

function ViewUserCell({ user }: { user: User }) {
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
					<span className="sr-only">View user</span>
				</Button>
				<Button className="cursor-pointer" variant="ghost" size="icon-sm">
					<PencilIcon />
					<span className="sr-only">Edit user</span>
				</Button>
				<Button
					className="cursor-pointer text-destructive hover:text-destructive"
					variant="ghost"
					size="icon-sm"
				>
					<Trash2Icon />
					<span className="sr-only">Delete user</span>
				</Button>
			</div>

			<Dialog open={open} onOpenChange={setOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{user.name}</DialogTitle>
						<DialogDescription>User #{user.id}</DialogDescription>
					</DialogHeader>
					<div className="space-y-2 text-sm text-foreground">
						<p><span className="font-medium text-gray-700">Email:</span> {user.email}</p>
						<p><span className="font-medium text-gray-700">Role:</span> {user.role}</p>
						<p><span className="font-medium text-gray-700">Status:</span> {user.status}</p>
						<p><span className="font-medium text-gray-700">Joined:</span> {user.joinedAt}</p>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => (
			<span className="font-mono text-xs text-gray-400">{row.getValue('id')}</span>
		),
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => (
			<span className="font-medium text-gray-500">{row.getValue('name')}</span>
		),
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => (
			<span className="text-gray-500">{row.getValue('email')}</span>
		),
	},
	{
		accessorKey: 'role',
		header: 'Role',
		cell: ({ row }) => (
			<span className="capitalize text-gray-500">{row.getValue('role')}</span>
		),
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			const status = row.getValue<string>('status');
			return (
				<span
					className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
						status === 'active'
							? 'bg-green-100 text-green-700'
							: 'bg-gray-100 text-gray-500'
					}`}
				>
					{status}
				</span>
			);
		},
	},
	{
		accessorKey: 'joinedAt',
		header: 'Joined',
		cell: ({ row }) => (
			<span className="text-gray-500">{row.getValue('joinedAt')}</span>
		),
	},
	{
		id: 'actions',
		header: 'Actions',
		cell: ({ row }) => <ViewUserCell user={row.original} />,
	},
];
