'use client';
import React from 'react';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { IconHome, IconMessage, IconWorldQuestion, IconMoon } from '@tabler/icons-react';
import { useAuthStore } from '@/store/Auth';
import slugify from '@/utils/slugify';
import { Button } from '@/components/ui/button';

export default function Header() {
	const { user } = useAuthStore();

	const navItems = [
		{
			name: 'Home',
			link: '/',
			icon: <IconHome className='h-4 w-4 text-neutral-500 dark:text-white' />,
		},
		{
			name: 'Questions',
			link: '/questions',
			icon: <IconWorldQuestion className='h-4 w-4 text-neutral-500 dark:text-white' />,
		},
	];

	if (user)
		navItems.push({
			name: 'Profile',
			link: `/users/${user.$id}/${slugify(user.name)}`,
			icon: <IconMessage className='h-4 w-4 text-neutral-500 dark:text-white' />,
		});

	return (
		<div className='relative w-full flex items-center'>
            <FloatingNav navItems={navItems} />
            {/* <Button className='text-white self-end z-[999] justify-self-end fixed right-14 w-fit inset-x-0'> Theme <IconMoon/></Button> */}
		</div>
	);
}
