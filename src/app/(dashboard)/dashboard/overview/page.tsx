import { Users, Layers, SquareCheckBig, TrendingUp, TrendingDown } from 'lucide-react';

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

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
		</div>
	);
};

export default Overview;
