import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getInitialsFromEmail(email?: string | null): string {
	if (!email) return '?';
	const parts = email.split('@')[0].split('.');
	if (parts.length >= 2) {
		return (parts[0][0] + parts[1][0]).toUpperCase();
	}
	return parts[0].slice(0, 2).toUpperCase();
}

export function getDisplayNameFromEmail(email?: string | null): string {
	if (!email) return '';
	const parts = email.split('@')[0].split('.');
	return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
}
