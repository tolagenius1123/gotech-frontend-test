'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Lock, Mail } from 'lucide-react';
import { loginValidationSchema } from '@/schemas/validation-schema';
import { FormButton, FormInput } from '@/components/form';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/auth-store';

const LoginForm = () => {
	const router = useRouter();
	const setUser = useAuthStore((state) => state.setUser);
	const [isLoading, setIsLoading] = useState(false);

	const formik = useFormik({
		initialValues: {
			emailAddress: '',
			password: '',
		},
		validationSchema: loginValidationSchema,
		onSubmit: async (values) => {
			setIsLoading(true);
			try {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				setUser({
					email: values.emailAddress,
				});
				toast.success('Login successful');
				formik.resetForm();
				router.push('/dashboard/overview');
			} catch (error) {
				console.error('Login failed:', error);
				toast.error('Login failed');
			} finally {
				setIsLoading(false);
			}
		},
	});

	const { getFieldProps, errors, touched, handleSubmit } = formik;

	return (
		<form onSubmit={handleSubmit} className="w-full">
			<h1 className="text-4xl font-semibold text-gray-900">Sign in</h1>
			<p className="mt-2 text-sm text-gray-500">
				Welcome back — enter your credentials to continue
			</p>

			<div className="mt-10 space-y-6">
				<FormInput
					id="emailAddress"
					type="email"
					label="Email address"
					placeholder="john.doe@gotech.com"
					iconLeft={<Mail className="h-4 w-4" />}
					inputStyle="h-12"
					{...getFieldProps('emailAddress')}
					touched={touched.emailAddress}
					error={errors.emailAddress}
				/>

				<div className="space-y-2">
					<FormInput
						id="password"
						type="password"
						label="Password"
						placeholder="Enter your password"
						iconLeft={<Lock className="h-4 w-4" />}
						inputStyle="h-12"
						{...getFieldProps('password')}
						touched={touched.password}
						error={errors.password}
					/>
					<div className="flex justify-end">
						<Link
							href="/forgot-password"
							className="text-sm text-gotech-primary hover:underline"
						>
							Forgot password?
						</Link>
					</div>
				</div>

				<FormButton
					btnStyles="bg-gotech-primary text-white rounded-xl w-full h-12 cursor-pointer hover:opacity-90 mt-2"
					btnType="submit"
					btnText={isLoading ? 'Signing in...' : 'Sign in'}
					size="default"
					isLoading={isLoading}
				/>

				<p className="text-center text-sm text-gray-500">
					Don&apos;t have an account?{' '}
					<Link
						href="/register"
						className="font-medium text-gotech-primary hover:underline"
					>
						Sign up
					</Link>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
