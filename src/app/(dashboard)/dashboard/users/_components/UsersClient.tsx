'use client';

import { useState, useMemo, useCallback } from 'react';
import { PlusIcon, SearchIcon } from 'lucide-react';

import type { User } from '@/types';
import { useDebounce } from '@/hooks/use-debounce';
import { DataTable } from '@/components/data-table/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { columns } from './columns';
import { AddUserDialog } from './AddUserDialog';

const DUMMY_USERS: User[] = [
	{
		id: 1,
		name: 'Alice Johnson',
		email: 'alice@example.com',
		role: 'Admin',
		status: 'active',
		joinedAt: 'Jan 12, 2024',
	},
	{
		id: 2,
		name: 'Bob Smith',
		email: 'bob@example.com',
		role: 'Editor',
		status: 'active',
		joinedAt: 'Feb 3, 2024',
	},
	{
		id: 3,
		name: 'Carol White',
		email: 'carol@example.com',
		role: 'Viewer',
		status: 'inactive',
		joinedAt: 'Mar 18, 2024',
	},
	{
		id: 4,
		name: 'David Brown',
		email: 'david@example.com',
		role: 'Editor',
		status: 'active',
		joinedAt: 'Apr 5, 2024',
	},
	{
		id: 5,
		name: 'Eva Martinez',
		email: 'eva@example.com',
		role: 'Viewer',
		status: 'active',
		joinedAt: 'Apr 22, 2024',
	},
	{
		id: 6,
		name: 'Frank Lee',
		email: 'frank@example.com',
		role: 'Admin',
		status: 'inactive',
		joinedAt: 'May 1, 2024',
	},
	{
		id: 7,
		name: 'Grace Kim',
		email: 'grace@example.com',
		role: 'Editor',
		status: 'active',
		joinedAt: 'May 14, 2024',
	},
	{
		id: 8,
		name: 'Henry Wilson',
		email: 'henry@example.com',
		role: 'Viewer',
		status: 'active',
		joinedAt: 'Jun 7, 2024',
	},
	{
		id: 9,
		name: 'Isla Davis',
		email: 'isla@example.com',
		role: 'Editor',
		status: 'inactive',
		joinedAt: 'Jun 30, 2024',
	},
	{
		id: 10,
		name: 'Jack Taylor',
		email: 'jack@example.com',
		role: 'Viewer',
		status: 'active',
		joinedAt: 'Jul 19, 2024',
	},
];

export function UsersClient() {
	const [users, setUsers] = useState<User[]>(DUMMY_USERS);
	const [searchTerm, setSearchTerm] = useState('');
	const [dialogOpen, setDialogOpen] = useState(false);

	const debouncedSearch = useDebounce(searchTerm, 300);

	const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	}, []);

	const filteredUsers = useMemo(() => {
		if (!debouncedSearch.trim()) return users;
		const term = debouncedSearch.toLowerCase();
		return users.filter(
			(user) =>
				user.name.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term) ||
				user.role.toLowerCase().includes(term)
		);
	}, [users, debouncedSearch]);

	const handleAddUser = useCallback(
		(values: Omit<User, 'id' | 'joinedAt' | 'status'>) => {
			const newUser: User = {
				...values,
				id: users.length + 1,
				status: 'active',
				joinedAt: new Date().toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric',
				}),
			};
			setUsers((prev) => [...prev, newUser]);
		},
		[users.length]
	);

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between gap-4">
				<div className="relative w-full max-w-sm">
					<SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input
						placeholder="Search users..."
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
					Add User
				</Button>
			</div>

			<DataTable columns={columns} data={filteredUsers} />

			<AddUserDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={handleAddUser} />
		</div>
	);
}
