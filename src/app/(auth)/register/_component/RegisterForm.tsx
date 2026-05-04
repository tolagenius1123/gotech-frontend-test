'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { Lock, Mail, User } from 'lucide-react';
import { registerValidationSchema } from '@/schemas/validation-schema';
import { FormButton, FormInput } from '@/components/form';
import { toast } from 'sonner';

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			emailAddress: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: registerValidationSchema,
		onSubmit: async () => {
			setIsLoading(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				toast.success('Account created successfully');
				formik.resetForm();
			} catch (error) {
				console.error('Registration failed:', error);
				toast.error('Registration failed. Please try again.');
			} finally {
				setIsLoading(false);
			}
		},
	});

	const { getFieldProps, errors, touched, handleSubmit } = formik;

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<h1 className="text-4xl font-semibold text-gray-900">Create account</h1>
			<p className="mt-2 text-sm text-gray-500">Join GoTech and get started today</p>

			<div className="mt-10 space-y-6">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
					<FormInput
						id="firstName"
						type="text"
						label="First name"
						placeholder="John"
						iconLeft={<User className="h-4 w-4" />}
						inputStyle="h-12"
						{...getFieldProps('firstName')}
						touched={touched.firstName}
						error={errors.firstName}
					/>
					<FormInput
						id="lastName"
						type="text"
						label="Last name"
						placeholder="Doe"
						iconLeft={<User className="h-4 w-4" />}
						inputStyle="h-12"
						{...getFieldProps('lastName')}
						touched={touched.lastName}
						error={errors.lastName}
					/>
				</div>

				<FormInput
					id="emailAddress"
					type="email"
					label="Email address"
					placeholder="you@example.com"
					iconLeft={<Mail className="h-4 w-4" />}
					inputStyle="h-12"
					{...getFieldProps('emailAddress')}
					touched={touched.emailAddress}
					error={errors.emailAddress}
				/>

				<FormInput
					id="password"
					type="password"
					label="Password"
					placeholder="Create a password"
					iconLeft={<Lock className="h-4 w-4" />}
					inputStyle="h-12"
					{...getFieldProps('password')}
					touched={touched.password}
					error={errors.password}
				/>

				<FormInput
					id="confirmPassword"
					type="password"
					label="Confirm password"
					placeholder="Repeat your password"
					iconLeft={<Lock className="h-4 w-4" />}
					inputStyle="h-12"
					{...getFieldProps('confirmPassword')}
					touched={touched.confirmPassword}
					error={errors.confirmPassword}
				/>

				<FormButton
					btnStyles="bg-gotech-primary text-white rounded-xl w-full h-12 cursor-pointer hover:opacity-90 mt-2"
					btnType="submit"
					btnText={isLoading ? 'Creating account...' : 'Create account'}
					size="default"
					isLoading={isLoading}
				/>

				<p className="text-center text-sm text-gray-500">
					Already have an account?{' '}
					<Link href="/login" className="font-medium text-gotech-primary hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</form>
	);
};

export default RegisterForm;
