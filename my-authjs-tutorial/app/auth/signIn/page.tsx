import { signInWithGithub } from '@/app/action/auth';
import React from 'react';

const SignIn = () => {
	return (
		<>
			<h1>Sign In </h1>
			<form action={signInWithGithub}>

			<input  type="submit" value={'Sign in with github'} />
			</form>
		</>
	);
};

export default SignIn;
