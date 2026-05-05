'use client';
import { useEffect, useState, startTransition } from 'react';
import { usePathname } from 'next/navigation';
import { CircleUser, LogOut, AlignLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import GoTechIcon from '@/assets/icons/GoTechIcon';
import { routes } from '@/lib/routes';
import SidebarLink from './SidebarLink';
import { Separator } from '../ui/separator';

const MobileMenu = () => {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		startTransition(() => {
			setIsOpen(false);
		});
	}, [pathname]);

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<AlignLeft size={20} className="text-[#667085]" />
			</SheetTrigger>

			<SheetContent side="right" className="w-72 p-0 overflow-y-auto custom-scrollbar">
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
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-3line-gray">
										<CircleUser size={24} className="text-gray-500" />
									</div>
									<div className="flex flex-col overflow-hidden">
										<p className="text-sm font-semibold text-gray-900 truncate">
											Olivia Rhye
										</p>
										<p className="text-sm text-gray-500 truncate">
											olivia@untitledui.com
										</p>
									</div>
								</div>
								<button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
									<LogOut size={20} />
								</button>
							</div>
						</div>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

export default MobileMenu;
