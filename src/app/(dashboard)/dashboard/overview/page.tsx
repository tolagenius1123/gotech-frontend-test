import {
	Users,
	Layers,
	SquareCheckBig,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
	CircleUserRound,
} from 'lucide-react';

import { RecentPostsWidget } from './_components/RecentPostsWidget';

const stats = [
	{
		label: 'Total Users',
		value: '2,847',
		change: '+12%',
		trend: 'up',
		icon: Users,
		iconBg: 'bg-blue-50',
		iconColor: 'text-gotech-primary',
	},
	{
		label: 'Active Posts',
		value: '1,240',
		change: '+8%',
		trend: 'up',
		icon: Layers,
		iconBg: 'bg-purple-50',
		iconColor: 'text-purple-500',
	},
	{
		label: 'Tasks Completed',
		value: '564',
		change: '-3%',
		trend: 'down',
		icon: SquareCheckBig,
		iconBg: 'bg-green-50',
		iconColor: 'text-green-500',
	},
];

const recentUsers = [
	{
		id: 1,
		name: 'Alice Johnson',
		email: 'alice@example.com',
		role: 'Admin',
		initials: 'AJ',
		color: 'bg-blue-100 text-blue-600',
	},
	{
		id: 2,
		name: 'Bob Smith',
		email: 'bob@example.com',
		role: 'Editor',
		initials: 'BS',
		color: 'bg-purple-100 text-purple-600',
	},
	{
		id: 3,
		name: 'Grace Kim',
		email: 'grace@example.com',
		role: 'Editor',
		initials: 'GK',
		color: 'bg-green-100 text-green-600',
	},
	{
		id: 4,
		name: 'David Brown',
		email: 'david@example.com',
		role: 'Viewer',
		initials: 'DB',
		color: 'bg-orange-100 text-orange-600',
	},
	{
		id: 5,
		name: 'Eva Martinez',
		email: 'eva@example.com',
		role: 'Viewer',
		initials: 'EM',
		color: 'bg-pink-100 text-pink-600',
	},
];

const activityFeed = [
	{
		id: 1,
		user: 'Alice Johnson',
		action: 'published a new post',
		target: 'Getting started with Next.js 15',
		time: '2 hours ago',
		initials: 'AJ',
		color: 'bg-blue-100 text-blue-600',
	},
	{
		id: 2,
		user: 'Bob Smith',
		action: 'created a draft',
		target: 'Understanding React Server Components',
		time: '4 hours ago',
		initials: 'BS',
		color: 'bg-purple-100 text-purple-600',
	},
	{
		id: 3,
		user: 'Grace Kim',
		action: 'completed a task',
		target: 'Design review for Q2',
		time: '6 hours ago',
		initials: 'GK',
		color: 'bg-green-100 text-green-600',
	},
	{
		id: 4,
		user: 'Frank Lee',
		action: 'opened a support ticket',
		target: 'Login page not loading',
		time: '8 hours ago',
		initials: 'FL',
		color: 'bg-red-100 text-red-600',
	},
	{
		id: 5,
		user: 'David Brown',
		action: 'joined the team',
		target: '',
		time: '1 day ago',
		initials: 'DB',
		color: 'bg-orange-100 text-orange-600',
	},
];

const Overview = () => {
	const today = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
				<p className="mt-1 text-sm text-gray-500">{today}</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="rounded-xl border border-3line-dark-gray bg-white p-5 space-y-4"
					>
						<div className="flex items-center justify-between">
							<p className="text-sm text-gray-500">{stat.label}</p>
							<div className={`rounded-lg p-2 ${stat.iconBg}`}>
								<stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
							</div>
						</div>
						<div className="flex items-end justify-between gap-3">
							<p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
							<span
								className={`flex items-center gap-1 text-xs font-medium ${
									stat.trend === 'up' ? 'text-green-600' : 'text-red-500'
								}`}
							>
								{stat.trend === 'up' ? (
									<TrendingUp className="h-3.5 w-3.5" />
								) : (
									<TrendingDown className="h-3.5 w-3.5" />
								)}
								{stat.change} this month
							</span>
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
				<RecentPostsWidget />

				<div className="lg:col-span-2 rounded-xl border border-3line-dark-gray bg-white">
					<div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
						<h2 className="text-sm font-semibold text-gray-900">Recent Users</h2>
						<a
							href="/dashboard/users"
							className="flex items-center gap-1 text-xs text-gotech-primary font-medium hover:underline"
						>
							View all <ArrowUpRight className="h-3.5 w-3.5" />
						</a>
					</div>
					<div className="divide-y divide-gray-50">
						{recentUsers.map((user) => (
							<div key={user.id} className="flex items-center gap-3 px-5 py-3.5">
								<div
									className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold ${user.color}`}
								>
									{user.initials}
								</div>
								<div className="min-w-0">
									<p className="text-sm font-medium text-gray-800 truncate">
										{user.name}
									</p>
									<p className="text-xs text-gray-400 truncate">{user.role}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			<div className="rounded-xl border border-3line-dark-gray bg-white">
				<div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
					<h2 className="text-sm font-semibold text-gray-900">Recent Activity</h2>
					<CircleUserRound className="h-4 w-4 text-gray-400" />
				</div>
				<div className="divide-y divide-gray-50">
					{activityFeed.map((item) => (
						<div key={item.id} className="flex items-start gap-3 px-5 py-3.5">
							<div
								className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold mt-0.5 ${item.color}`}
							>
								{item.initials}
							</div>
							<div className="min-w-0 flex-1">
								<p className="text-sm text-gray-700">
									<span className="font-medium text-gray-900">{item.user}</span>{' '}
									{item.action}
									{item.target && (
										<>
											{' '}
											<span className="font-medium text-gray-700">
												&ldquo;{item.target}&rdquo;
											</span>
										</>
									)}
								</p>
								<p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Overview;
