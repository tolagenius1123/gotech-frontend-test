'use client';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import SidebarLink from './SidebarLink';
import { GoTechIcon } from '@/assets/icons/GoTechIcon';
import { routes } from '@/lib/routes';
import { Separator } from '../ui/separator';
import { useAuthStore } from '@/store/auth-store';
import { getInitialsFromEmail, getDisplayNameFromEmail } from '@/lib/utils';

const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const user = useAuthStore((state) => state.user);
	const clearUser = useAuthStore((state) => state.clearUser);

	const handleLogout = () => {
		clearUser();
		router.push('/login');
	};

	return (
		<div className="bg-white hidden md:block w-70 border-r border-r-3line-dark-gray overflow-y-auto custom-scrollbar h-screen">
			<div className="flex flex-col h-full py-5 px-5">
				<div className="flex-1">
					<div className="w-full flex items-center gap-2">
						<GoTechIcon className="h-12 w-12" />
						<p className="font-semibold text-gotech-primary text-lg md:text-2xl">
							GoTech
						</p>
					</div>

					<div className="mt-4 flex flex-col gap-1">
						{routes.map((route) => (
							<SidebarLink
								key={route.href}
								{...route}
								isActive={pathname === route.href}
							/>
						))}
					</div>
				</div>

				<div className="mt-4">
					<Separator className="my-3" />
					<div className="py-2 cursor-pointer pb-4">
						<div className="flex items-center justify-between gap-3">
							<div className="flex items-center gap-3">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gotech-primary text-white text-sm font-semibold">
									{getInitialsFromEmail(user?.email)}
								</div>
								<div className="flex flex-col overflow-hidden">
									<p className="text-sm font-semibold text-gray-900 truncate">
										{getDisplayNameFromEmail(user?.email)}
									</p>
									<p className="text-sm text-gray-500 truncate">{user?.email}</p>
								</div>
							</div>
							<button
								onClick={handleLogout}
								className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
							>
								<LogOut size={20} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
