'use client';

import { useCallback } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import type { User } from '@/types';
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
	name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
	email: Yup.string().email('Invalid email address').required('Email is required'),
	role: Yup.string().required('Role is required'),
});

interface AddUserDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAdd: (user: Omit<User, 'id' | 'joinedAt' | 'status'>) => void;
}

export function AddUserDialog({ open, onOpenChange, onAdd }: AddUserDialogProps) {
	const onSubmit = useCallback(
		(
			values: { name: string; email: string; role: string },
			{ resetForm }: { resetForm: () => void }
		) => {
			onAdd(values);
			resetForm();
			onOpenChange(false);
		},
		[onAdd, onOpenChange]
	);

	const formik = useFormik({
		initialValues: { name: '', email: '', role: '' },
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
					<DialogTitle>Add User</DialogTitle>
					<DialogDescription>
						Fill in the details below to add a new user.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							placeholder="Enter full name"
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={!!(formik.touched.name && formik.errors.name)}
							className="h-10"
						/>
						{formik.touched.name && formik.errors.name && (
							<p className="text-xs text-destructive">{formik.errors.name}</p>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Enter email address"
							value={formik.values.email}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={!!(formik.touched.email && formik.errors.email)}
							className="h-10"
						/>
						{formik.touched.email && formik.errors.email && (
							<p className="text-xs text-destructive">{formik.errors.email}</p>
						)}
					</div>

					<div className="flex flex-col gap-1.5">
						<Label htmlFor="role">Role</Label>
						<Input
							id="role"
							name="role"
							placeholder="e.g. Admin, Editor, Viewer"
							value={formik.values.role}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							aria-invalid={!!(formik.touched.role && formik.errors.role)}
							className="h-10"
						/>
						{formik.touched.role && formik.errors.role && (
							<p className="text-xs text-destructive">{formik.errors.role}</p>
						)}
					</div>

					<div className="flex justify-end gap-2 pt-1">
						<Button
							type="button"
							variant="outline"
							className="py-5 px-3 cursor-pointer"
							onClick={() => handleOpenChange(false)}
						>
							Cancel
						</Button>
						<Button
							className="bg-gotech-primary py-5 px-3 cursor-pointer"
							type="submit"
						>
							Add User
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
