import Image from 'next/image';
import styles from './page.module.css';
import { useSession } from 'next-auth/react';
import { auth } from '@/auth';

export default async function Home() {
	const session = await auth();
	console.log(session);

	return (
		<>
			<h1>Welcome to Our Home Page</h1>
			<div>{session?.user?.name || 'Guest'}</div>
		</>
	);
}
