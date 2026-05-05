import { Flag, House, Layers, LifeBuoy, Settings, SquareCheckBig, Users } from 'lucide-react';

export const routes = [
	{
		href: '/dashboard/overview',
		label: 'Overview',
		icon: <House size={20} />,
	},
	{
		href: '/dashboard/users',
		label: 'Users',
		icon: <Users size={20} />,
	},
	{
		href: '/dashboard/posts',
		label: 'Posts',
		icon: <Layers size={20} />,
	},
	{
		href: '/dashboard/tasks',
		label: 'Tasks',
		icon: <SquareCheckBig size={20} />,
	},
	{
		href: '/dashboard/reporting',
		label: 'Reporting',
		icon: <Flag size={20} />,
	},
	{
		href: '/dashboard/support',
		label: 'Support',
		icon: <LifeBuoy size={20} />,
	},
	{
		href: '/dashboard/settings',
		label: 'Settings',
		icon: <Settings size={20} />,
	},
];
