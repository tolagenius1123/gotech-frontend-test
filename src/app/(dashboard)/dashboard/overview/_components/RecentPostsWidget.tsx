'use client';

import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { usePosts } from '@/hooks/use-posts';

export function RecentPostsWidget() {
	const { data: posts, isLoading, isError } = usePosts();

	return (
		<div className="lg:col-span-3 rounded-xl border border-3line-dark-gray bg-white">
			<div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
				<h2 className="text-sm font-semibold text-gray-900">Recent Posts</h2>
				<Link
					href="/dashboard/posts"
					className="flex items-center gap-1 text-xs text-gotech-primary font-medium hover:underline"
				>
					View all <ArrowUpRight className="h-3.5 w-3.5" />
				</Link>
			</div>

			{isLoading && (
				<div className="divide-y divide-gray-50">
					{Array.from({ length: 5 }).map((_, i) => (
						<div
							key={i}
							className="flex items-center justify-between px-5 py-3.5 gap-4"
						>
							<div className="space-y-1.5 flex-1">
								<div className="h-3.5 w-3/4 rounded bg-gray-100 animate-pulse" />
								<div className="h-3 w-1/3 rounded bg-gray-100 animate-pulse" />
							</div>
						</div>
					))}
				</div>
			)}

			{isError && (
				<p className="px-5 py-6 text-sm text-red-500 text-center">Failed to load posts.</p>
			)}

			{posts && (
				<div className="divide-y divide-gray-50">
					{posts.slice(0, 5).map((post) => (
						<div
							key={post.id}
							className="flex items-center justify-between px-5 py-3.5 gap-4"
						>
							<div className="min-w-0">
								<p className="text-sm font-medium text-gray-800 truncate capitalize">
									{post.title}
								</p>
								<p className="text-xs text-gray-400 mt-0.5 truncate max-w-xs">
									{post.body}
								</p>
							</div>
							<span className="shrink-0 font-mono text-xs text-gray-400">
								{post.id}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
