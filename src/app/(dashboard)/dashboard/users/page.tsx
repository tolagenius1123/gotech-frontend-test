import { UsersClient } from './_components/UsersClient';

const Users = () => {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-gray-900">Users</h1>
				<p className="mt-1 text-sm text-gray-500">
					Manage your team members and their roles
				</p>
			</div>
			<UsersClient />
		</div>
	);
};

export default Users;
