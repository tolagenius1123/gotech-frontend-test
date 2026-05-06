'use client';

import { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAddPost } from '@/hooks/use-posts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';

const schema = Yup.object({
	title: Yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
	body: Yup.string()
		.min(10, 'Description must be at least 10 characters')
		.required('Description is required'),
});

interface AddPostDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export function AddPostDialog({ open, onOpenChange }: AddPostDialogProps) {
	const { mutate: addPost, isPending } = useAddPost();

	const onSubmit = useCallback(
		(values: { title: string; body: string }, { resetForm }: { resetForm: () => void }) => {
			addPost(
				{ title: values.title, body: values.body, userId: 1 },
				{
					onSuccess: () => {
						resetForm();
						onOpenChange(false);
					},
				}
			);
		},
		[addPost, onOpenChange]
	);

	const formik = useFormik({
		initialValues: { title: '', body: '' },
		validationSchema: schema,
		onSubmit,
	});

	const handleOpenChange = useCallback(
		(nextOpen: boolean) => {
			if (!nextOpen) formik.resetForm();
			onOpenChange(nextOpen);
		},
		[formik, onOpenChange]
	);

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add Post</DialogTitle>
					<DialogDescription>
						Fill in the details below to create a new post.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							name="title"
							placeholder="Enter post title"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={!!(formik.touched.title && formik.errors.title)}
							className="h-10"
						/>
						{formik.touched.title && formik.errors.title && (
							<p className="text-xs text-destructive">{formik.errors.title}</p>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="body">Description</Label>
						<textarea
							id="body"
							name="body"
							rows={4}
							placeholder="Enter post description"
							value={formik.values.body}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={!!(formik.touched.body && formik.errors.body)}
							className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 resize-none transition-colors"
						/>
						{formik.touched.body && formik.errors.body && (
							<p className="text-xs text-destructive">{formik.errors.body}</p>
						)}
					</div>

					<div className="flex justify-end gap-2 pt-1">
						<Button
							type="button"
							variant="outline"
							className=" py-5 px-3 cursor-pointer"
							onClick={() => handleOpenChange(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button
							className="bg-gotech-primary py-5 px-3 cursor-pointer"
							type="submit"
							disabled={isPending}
						>
							{isPending ? 'Adding...' : 'Add Post'}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
