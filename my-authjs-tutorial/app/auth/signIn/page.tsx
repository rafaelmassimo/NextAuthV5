import {
	signInWithCrediantials,
	signInWithEmail,
	signInWithGithub,
	signInWithGoogle,
	signInWithZoom,
} from '@/app/action/auth';
import React from 'react';

const SignIn = () => {
	return (
		<>
			<h1>Sign In </h1>
			<form action={signInWithGithub}>
				<input type="submit" value={'Sign in with github'} />
			</form>
			<br />

			<form action={signInWithGoogle}>
				<input type="submit" value={'Sign in with google'} />
			</form>
			<br />

			<form action={signInWithZoom}>
				<input type="submit" value={'Sign in with zoom'} />
			</form>
			<br />

			<form action={signInWithEmail}>
				Email:
				<input type="text" name="email-address" />
				<input type="submit" value={'Sign In via email'} />
			</form>
			<br />

			<form action={signInWithCrediantials}>
				Email:
				<input type="text" name="email" />
				Password:
				<input type="text" name="password" />
				<input type="submit" value={'Sign In via Credentials'} />
			</form>
		</>
	);
};

export default SignIn;
