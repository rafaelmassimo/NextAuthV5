import { logOutAction } from '@/app/action/auth';
import { createTodo } from '@/app/action/todos';
import { auth } from '@/auth';
import prisma from '@/prismaClient';

import Image from 'next/image';
import React from 'react';

const Todos = async () => {
	const session = await auth();
	const todos = await prisma.todo.findMany({
		where: {
			organizationId: session?.organizationId
		}
	});
console.log(session);

	return (
		<div>
			<h1>This is the TODO page</h1>

			{session ? <pre>{JSON.stringify(session.user, null, 2)}</pre> : null}

			<Image src={session?.user?.image!} alt="user image" width={100} height={100}></Image>
			<form action={logOutAction}>
				<input type="submit" value={'Logout'} />
			</form>

			<form action={createTodo}>
				<input type="text" name='todo' /> {' '} <input type="submit" value={'Add a new todo'} />
			</form>

			<h3>Todos:</h3>
			{JSON.stringify(todos, null, 2)}
		</div>
	);
};

export default Todos;
