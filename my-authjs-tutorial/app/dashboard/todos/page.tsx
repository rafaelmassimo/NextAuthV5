import { logOutAction } from '@/app/action/auth';
import { auth } from '@/auth';
import Image from 'next/image';
import React from 'react';

const Todos = async () => {
	const session = await auth();

	return (
		<div>
			<h1>This is the TODO page</h1>

			{session ? <pre>{JSON.stringify(session.user, null, 2)}</pre> : null}

			<Image src={session?.user?.image!} alt="user image" width={100} height={100}></Image>
			<form action={logOutAction}>
				<input type="submit" value={'Logout'} />
			</form>
		</div>
	);
};

export default Todos;
