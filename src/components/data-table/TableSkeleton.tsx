export default function TableSkeleton() {
	return (
		<div className="rounded-md border animate-pulse">
			<div className="h-12 bg-[#FBFBFD] border-b" />
			{Array.from({ length: 8 }).map((_, i) => (
				<div key={i} className="flex gap-4 px-4 py-4 border-b last:border-0">
					<div className="h-4 w-8 rounded bg-gray-100" />
					<div className="h-4 w-8 rounded bg-gray-100" />
					<div className="h-4 flex-1 rounded bg-gray-100" />
					<div className="h-4 flex-1 rounded bg-gray-100" />
				</div>
			))}
		</div>
	);
}
