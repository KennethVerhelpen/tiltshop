import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { ArrowForwardRounded } from '@mui/icons-material';

import { getAwsImageUrl } from '../../lib/utils';
import { ArticleType, TopicType, TypeType } from '../../lib/types';
import { Shape, Main, Footer, IconButton, ImageWrapper, BudgetRangeStyled } from './article.styles';

export type ArticleProps = {
	type?: TypeType;
	topic?: TopicType;
	article: ArticleType;
	index?: number;
	disabled?: boolean;
	className?: string;
	theme?: 'dark' | 'light';
}

export const Article = (props: ArticleProps) => {
	const { type, topic, index, disabled, article, className, theme } = { ...props };

	const price = article.price ? Number(article.price) : Number(article.priceNumber);
	const topicName = topic ? topic.name : article.typeName;
	const typeName = type ? type.name : article.typeName;
	const typeSlug = type ? type.slug : article.typeSlug;
	const topicSlug = topic ? topic.slug : article.topicSlug;

	return (
		// eslint-disable-next-line react/jsx-no-target-blank
		<a
			rel={'sponsored'}
			aria-label={article.title}
			className={clsx(className)}
			href={article.trackingUrl}
			target={'_blank'}
		>
			<Shape className={clsx({'border border-primary-500' : theme === 'dark'}, 'bg-primary-900 relative width-100 layout-column layout-align-end-stretch rounded-xl overflow-hidden cursor-pointer')}>
				<div className={'flex'}></div>
				<Main className={clsx({'pb-32' : disabled}, 'layout-column layout-align-start-start pt-32 px-32')}>
					{typeName || topicName ?
						<span className={'text-primary-300 small mb-8 text-capitalize'}>
							{typeName ? <span>{typeName}</span> : null }
							{typeName && topicName ? <span>&nbsp;/&nbsp;</span> : null }
							{typeName ? <span>{topicName}</span> : null }
						</span>
						: null 
					}
					{article.title ?
						<span className={'text-primary-100 strong h6 mb-8'}>
						{article.title.length > 45
							? `${article.title.slice(0,45)}...`
							: article.title}
						</span>
						: null 
					}
					{ !disabled &&
						<>
							{ article.description &&
								<span className={'small mb-8 text-primary-300'}>
									<span>{article.description.slice(0,20)}...</span>
									{' '}
									<Link href={`/${typeSlug}/${topicSlug}/${article.slug}`}>
										<span className={'underline text-primary-300'} aria-label={'Read more'}>Read more</span>
									</Link>
								</span>
								}
							{ article.trackingUrl ? 
								<BudgetRangeStyled className={'rounded-sm px-16 py-4 text-primary-100'} amount={price}/>
							: <span className={'rounded-sm px-16 py-4 text-primary-100 border border-primary-100'}>Out of stock</span>}
						</>
					}
				</Main>
				{ !disabled &&
					<Footer className={clsx({'invisible' : article.trackingUrl === null }, 'px-32 py-16 layout-row layout-align-start-center')}>
						<span className={'flex text-truncate text-primary-100'}>See on <b>Amazon</b></span>
						<IconButton className={'layout layout-align-center-center p-8 rounded'}>
							<ArrowForwardRounded className={'text-primary-100'} style={{ fontSize: 16 }}/>
						</IconButton>
					</Footer>
				}
				<ImageWrapper className={clsx({'out' : article.trackingUrl === null})}>
					<Image
						quality={'100'}
						layout={'fill'}
						objectFit={'cover'}
						objectPosition={'center'}
						priority={index <= 2}
						loading={index <= 2 ? 'eager' : 'lazy'}
						alt={`${article.imgAlt} - ${topicName}`}
						src={getAwsImageUrl(`/images/articles/${article.id}/article.jpg`)}
					/>
				</ImageWrapper>
			</Shape>
		</a>
	);
}