import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export const GET = async () => {
	const session = await auth();
	if (session?.userId) {
		return NextResponse.json({
			message: 'pong',
		});
	} else {
		return new Response('Sorry, no access', {
			status: 403,
		});
	}
};
