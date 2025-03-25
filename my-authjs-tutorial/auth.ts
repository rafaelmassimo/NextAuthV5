import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prismaClient';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Zoom from 'next-auth/providers/zoom';

export const { handlers, signIn, signOut, auth } = NextAuth({
	// This adapter came from documentation, and the prisma variable I have created in another file and imported here, following documentation
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/signIn',
	},
	providers: [
		GitHub,
		Google({
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
		Zoom,
	],
	callbacks: {
		authorized: (params) => {
			console.log('inside auth');
			// The !! make the sentence boolean, if a session does exist let it login if not doesn't allow the access to the app
			return !!params.auth?.user;
		},
	},
});
