import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<main className="w-full min-h-screen md:h-screen flex">
			<Sidebar />
			<div className="flex flex-col flex-1 min-w-0 bg-3line-gray">
				<Header />
				<div className="flex-1 pt-18 p-3 md:pt-5 md:p-5 overflow-y-auto dashboard-scrollbar">
					{children}
				</div>
			</div>
		</main>
	);
}
