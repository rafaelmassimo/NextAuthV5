'use server'

import { auth } from "@/auth";
import prisma from "@/prismaClient";
import { revalidatePath } from "next/cache";

export const createTodo = async (formData: FormData) => {
    const session = await auth();
    const organizationId = session?.organizationId;


	const name = formData.get('todo') as string;

	const res = await prisma.todo.create({
		data: {
			name, 
            organizationId
		}
	})
    if(res) {
        revalidatePath('/dashboard/todos')
    }
}