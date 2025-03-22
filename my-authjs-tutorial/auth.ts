import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, signIn, signOut, auth } = NextAuth({
    pages: {
        signIn: '/auth/signIn'
    },
	providers: [GitHub],
	callbacks: {
		authorized: (params) => {
			console.log('inside auth');
			// The !! make the sentence boolean, if a session does exist let it login if not doesn't allow the access to the app
			return !!params.auth?.user
		},
	},
});
