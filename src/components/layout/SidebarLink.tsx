import { cn } from '@/lib/utils';
import Link from 'next/link';

type SidebarLinkProps = {
	href: string;
	label: string;
	icon: React.ReactNode;
	isActive?: boolean;
	badge?: number;
};

const SidebarLink = ({ href, label, icon, isActive, badge }: SidebarLinkProps) => {
	return (
		<Link
			href={href}
			className={cn(
				'flex items-center justify-between h-11 px-3 rounded-lg group transition-colors',
				isActive ? 'bg-[#F1F2F4]' : 'hover:bg-[#F7F7F8]'
			)}
		>
			<div className="flex items-center gap-3">
				<span
					className={cn(
						'text-gray-500 group-hover:text-gotech-primary pl-2',
						isActive && 'text-gotech-primary'
					)}
				>
					{icon}
				</span>

				<span
					className={cn(
						'text-[15px] font-medium text-gray-600 group-hover:text-gotech-primary',
						isActive && 'text-gotech-primary'
					)}
				>
					{label}
				</span>
			</div>

			{badge && (
				<span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full text-gray-700">
					{badge}
				</span>
			)}
		</Link>
	);
};

export default SidebarLink;
