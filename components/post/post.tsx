import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { FavoriteTwoTone, RemoveRedEyeTwoTone } from '@mui/icons-material';

import { PostType } from '../../lib/types';
import { getReadingTime } from '../../lib/utils';
import* as S from './post.styles';


type PostProps = {
	className?: string;
	post: PostType;
}

export const Post: React.FC<PostProps> = (props) => {
	const { className, post } = props;
	const readingTime = getReadingTime([post.content]);

	return (
			<Link href={`blog/${post.slug}`}>
				<S.Shape className={clsx(className, 'bg-neutral-100 layout-column rounded-xl border shadow-2 cursor-pointer')}>
					<header className={'p-8'}>
						<S.ImageWrapper className={'relative width-100'}>
							<Image
								className={'rounded-lg'}
								src={'/images/default/placeholder.jpg'}
								layout={'fill'}
								quality={'100'}
								objectFit={'cover'}
								objectPosition={'center'}
								priority={true}
								loading={'eager'}
								alt={'image'}
							/>
						</S.ImageWrapper>
					</header>
					<main className={'p-32'}>
						<h3 className={'strong h2 mb-8'}>{post.title}</h3>
						<span className={'small layout-row mb-32 text-primary-500'}>
							{readingTime != null ? 
								<>
									<span>{readingTime} min. read</span>
									&nbsp;|&nbsp;
								</>
							: null }
							<span>{post.date}</span> 
						</span>
						<p className={'lh-2'}>{`${post.content.slice(0,160)}...`}</p>
						<a className={'underline'}>Read more</a>
					</main>
					<footer className={'px-32 pb-16 layout-row layout-align-space-between-center'}>
						<div className={'layout-row layout-align-center-center'}>
							<FavoriteTwoTone style={{ fontSize: 14 }} className={'mr-4'}/>
							<span className={'small'}>{post.date}</span>
						</div>
						<div className={'layout-row layout-align-center-center'}>
							<RemoveRedEyeTwoTone style={{ fontSize: 14 }} className={'mr-4'}/>
							<span className={'small'}>{post.date}</span>
						</div>
					</footer>
				</S.Shape>
			</Link>
	);
}