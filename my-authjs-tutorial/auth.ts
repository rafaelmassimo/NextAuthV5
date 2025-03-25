import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/prismaClient';
import sgMail from '@sendgrid/mail';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Zoom from 'next-auth/providers/zoom';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
// console.log('SENDGRID_API_KEY:', process.env.SENDGRID_API_KEY);
// console.log('SENDGRIP_EMAIL_DOMAIN:', process.env.SENDGRIP_EMAIL_DOMAIN);

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
		{
			id: 'sendgrid',
			name: 'Sendgrid',
			// @ts-ignore
			type: 'email',
			async sendVerificationRequest({
				identifier,
				url,
			}: {
				identifier: string;
				url: string;
			}): Promise<void> {
				sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

				const message = {
					to: identifier,
					from: process.env.SENDGRIP_EMAIL_DOMAIN!,
					subject: 'Continue sign in',
					text: 'click on this link to continue ' + url,
				};
				console.log(message, url);

				sgMail.send(message).then(
					() => console.log('Email sent successfully'),
					(error) => console.error('Error sending email:', error),
				);
			},
		},
	],
	callbacks: {
		authorized: (params) => {
			console.log('inside auth');
			// The !! make the sentence boolean, if a session does exist let it login if not doesn't allow the access to the app
			return !!params.auth?.user;
		},
	},
});
