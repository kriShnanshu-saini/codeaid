import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
import { cn } from '@/lib/utils';
import Header from './components/Header';

export const metadata: Metadata = {
	title: 'CodeAid',
	description: 'Share, discuss, grow and resolve your errors with peers',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className='dark'>
			<body className={cn(inter.className, 'dark:bg-black ')}>
				<Header />
				{children}
			</body>
		</html>
	);
}
