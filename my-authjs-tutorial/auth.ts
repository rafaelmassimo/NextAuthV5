import NextAuth from "next-auth"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from "@prisma/client"
import { prisma } from '@/prismaClient';
import sgMail from '@sendgrid/mail';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Zoom from 'next-auth/providers/zoom';
import Credentials from 'next-auth/providers/credentials';
import { adjectives, colors, uniqueNamesGenerator } from 'unique-names-generator';
import { JWT } from 'next-auth/jwt';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

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
		Credentials({
			async authorize(credentials) {
				const { email, password } = credentials as { email: string; password: string };

				// Find user in the database
				const user = await prisma.user.findFirst({
					where: {
						email: email,
					},
				});
				if (user) {
					return user;
				} else {
					return null;
				}

				//? Validate user and password (add your own logic here)
				// if (user && password === 'yourPasswordValidationLogic') {
				// 	return user; // Return the user object
				// }

				// return null; // Return null if authentication fails
			},
		}),
	],
	callbacks: {
		authorized: (params: any) => {
			console.log('inside auth');
			// The !! make the sentence boolean, if a session does exist let it login if not doesn't allow the access to the app
			return !!params.auth?.user;
		},

		async session(params: any) {
			console.log('*** in session callback ***: ', params);
			console.log(Object.keys(params));
			const { session, token } = params;
			if (token.userId) {
				console.log('adding userId to session from token');
				session.userId = token.userId as string;
				session.organizationId = token.organizationId as string;
			}
			return session;
		},
		jwt: async (params: any) => {
			console.log('*** in jwt token callback ***: ', params);
			const { token, user, account, profile, isNewUser, trigger } = params;
			if (user) {
				console.log('*** got user in jwt token, will add userId to token');
				token.userId = user.id;
				if (user.organizationId) {
					token.organizationId = user.organizationId;
				} else {
					const latestUser = await prisma.user.findFirstOrThrow({
						where: { id: user.id },
					});
					token.organizationId = latestUser.organizationId;
				}
			}
			return token;
		},
	},

	events: {
		createUser: async (message: { user: { id: string } }) => {
			const { user } = message;
			console.log('we just created a new user', user);
			const randomName = uniqueNamesGenerator({
				dictionaries: [adjectives, colors],
			});
			const organization = await prisma.organization.create({
				data: {
					name: randomName,
					users: {
						connect: {
							id: user.id,
						},
					},
				},
			});
			console.log('Also created an organization', organization);
		},
	},
});
