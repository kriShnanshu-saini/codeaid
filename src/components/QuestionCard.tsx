'use client';

import React from 'react';
import { BorderBeam } from './magicui/border-beam';
import Link from 'next/link';
import { Models } from 'appwrite';
import slugify from '@/utils/slugify';
import { avatars } from '@/models/client/config';
import convertDateToRelativeTime from '@/utils/relativeTime';
import { databases } from '@/models/server/config';
import { db, questionCollection } from '@/models/name';

const QuestionCard = ({ ques }: { ques: Models.Document }) => {
	const [height, setHeight] = React.useState(0);
	const ref = React.useRef<HTMLDivElement>(null);

	React.useEffect(() => {
		if (ref.current) {
			setHeight(ref.current.clientHeight);
		}
	}, [ref]);

	return (
		<div
			ref={ref}
			className='relative flex flex-col gap-4 overflow-hidden rounded-xl border border-white/20 bg-white/5 p-4 duration-200 hover:bg-white/10 sm:flex-row mx-2'>
			<BorderBeam
				size={height}
				duration={12}
				delay={9}
			/>
			<div className='relative shrink-0 text-xs text-left'>
				<p>{ques.totalVotes} votes</p>
				<p>{ques.totalAnswers} answers</p>
			</div>
			<div className='relative w-full flex flex-col'>
				<Link
					href={`/questions/${ques.$id}/${slugify(ques.title)}`}
					className='text-orange-500 duration-200 hover:text-orange-600'>
					<h2 className='text-base'>{ques.title}</h2>
				</Link>
				<div className='mt-3 flex flex-wrap items-center justify-between text-xs gap-2'>
					<div className='flex flex-wrap gap-x-2 items-center justify-end '>
						{ques.tags.map((tag: string) => (
							<Link
								key={tag}
								href={`/questions?tag=${tag}`}
								className='inline-block rounded-xl bg-white/10 px-2 py-0.5 duration-200 hover:bg-white/20'>
								#{tag}
							</Link>
						))}
					</div>
					<div className='flex gap-x-2 justify-start items-baseline justify-self-end text-nowrap ml-auto'>
						<div className='ml-auto flex items-baseline justify-end gap-1'>
							<picture>
								<img
									src={avatars.getInitials(ques.author.name, 24, 24).href}
									alt={ques.author.name}
									className='rounded-xl object-cover inline-flex items-center justify-center'
								/>
							</picture>
							<Link
								href={`/users/${ques.author.$id}/${slugify(ques.author.name)}`}
								className='text-orange-500 hover:text-orange-600'>
								{ques.author.name}
							</Link>
							{/* <strong>&quot;{ques.author.reputation}&quot;</strong> */}
						</div>
						<p className='text-xs block'>{convertDateToRelativeTime(new Date(ques.$createdAt))}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
