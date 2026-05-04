import * as yup from 'yup';

export const loginValidationSchema = yup.object().shape({
	emailAddress: yup
		.string()
		.email('Invalid email format, please enter a valid email address')
		.required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol'),
});

export const registerValidationSchema = yup.object().shape({
	firstName: yup
		.string()
		.min(2, 'First name must be at least 2 characters')
		.required('First name is required'),
	lastName: yup
		.string()
		.min(2, 'Last name must be at least 2 characters')
		.required('Last name is required'),
	emailAddress: yup
		.string()
		.email('Invalid email format, please enter a valid email address')
		.required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.matches(/[0-9]/, 'Password requires a number')
		.matches(/[a-z]/, 'Password requires a lowercase letter')
		.matches(/[A-Z]/, 'Password requires an uppercase letter')
		.matches(/[^\w]/, 'Password requires a symbol'),
	confirmPassword: yup
		.string()
		.required('Please confirm your password')
		.oneOf([yup.ref('password')], 'Passwords do not match'),
});
