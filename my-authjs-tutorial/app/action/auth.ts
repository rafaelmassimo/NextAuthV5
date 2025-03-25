'use server';

import { signIn, signOut } from '@/auth';

export const signInWithGithub = async (formData: FormData) => {
	console.log('inside sign with github');
	await signIn('github', {
		redirectTo: '/dashboard/todos',
	});
};

export const signInWithGoogle = async (formData: FormData) => {
	await signIn('google', {
		redirectTo: '/dashboard/todos',
	});
};

export const signInWithZoom = async (formData: FormData) => {
	await signIn('zoom', {
		redirectTo: '/dashboard/todos',
	});
};

export const logOutAction = async () => {
	await signOut({
		redirectTo: '/auth/signIn',
	});
};

export const signInWithEmail = async (formData: FormData) => {
	const emailAddress = formData.get('email-address') as string || '';
	await signIn('sendgrid', {
		redirectTo: '/dashboard/todos',
		email:emailAddress
	});
};
