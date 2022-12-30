import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { FavoriteTwoTone, RemoveRedEyeTwoTone } from '@mui/icons-material';

import { PostType } from '../../lib/types';
import { getAwsImageUrl } from '../../lib/utils';
import { thumbnailPlaceholder } from '../../lib/constants';
import* as S from './post.styles';


type PostProps = {
	className?: string;
	post: PostType;
}

export const Post: React.FC<PostProps> = (props) => {
	const { className, post } = props;
	const thumbnailImageUrl = getAwsImageUrl(`/images/blog/${post.slug}/thumbnail.jpg`);

	const [thumbnailImage, setThumbnailImage] = useState<string | undefined>(thumbnailImageUrl);
	const contentPreview = post.content.length > 0 ? post.content : post.excerpt;
	const slicedTitle = post.title.length > 60 ? `${post.title.slice(0,60)}...` : post.title;

	return (
			<Link href={`blog/${post.slug}`}>
				<S.Shape className={clsx(className, 'bg-neutral-100 layout-column rounded-xl border border-primary-300 shadow-2 cursor-pointer')}>
					<header className={'p-8'}>
						<S.ImageWrapper className={'relative width-100'}>
							<Image
								className={'rounded-lg'}
								src={thumbnailImage || thumbnailPlaceholder}
								layout={'fill'}
								quality={'100'}
								objectFit={'cover'}
								objectPosition={'center'}
								priority={true}
								loading={'eager'}
								alt={post?.title}
								onError={() => setThumbnailImage(thumbnailPlaceholder)}
							/>
						</S.ImageWrapper>
					</header> 
					<main className={'p-32'}>
						<h3 className={'strong h3 mb-8'}>{slicedTitle}</h3>
						<span className={'small layout-row mb-32 text-primary-500'}>
							{post.time != null ? 
								<>
									<span>{post.time} min. read</span>
									&nbsp;|&nbsp;
								</>
							: null }
							<span>{post.date}</span> 
						</span>
						<p className={'lh-2'}>{`${contentPreview.slice(0,160)}...`}</p>
						<a className={'underline mt-8 display-block'}>Read more</a>
					</main>
					<footer className={'px-32 pb-16 layout-row layout-align-space-between-center'}>
						<div className={'layout-row layout-align-center-center'}>
							<FavoriteTwoTone style={{ fontSize: 16 }} className={'mr-4 text-primary-500'}/>
							<span className={'small text-primary-500'}>{post.date}</span>
						</div>
						<div className={'layout-row layout-align-center-center'}>
							<RemoveRedEyeTwoTone style={{ fontSize: 16 }} className={'mr-4 text-primary-500'}/>
							<span className={'small text-primary-500'}>{post.date}</span>
						</div>
					</footer>
				</S.Shape>
			</Link>
	);
}