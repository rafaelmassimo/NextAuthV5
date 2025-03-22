'use server';

import { signIn, signOut } from "@/auth";

export const signInWithGithub = async (formData: FormData) => {
	console.log('inside sign with github');
	await signIn('github', {
		redirectTo:'/dashboard/todos'
	})
};


export const logOutAction = async () => {
	await signOut({
		redirectTo: '/auth/signIn'
	})
}