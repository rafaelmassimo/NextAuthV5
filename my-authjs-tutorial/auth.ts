import NextAuth from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/auth/signIn'
    },
	providers: [],
	callbacks: {
		authorized: (params) => {
			console.log('inside auth');

			return false;
		},
	},
});
