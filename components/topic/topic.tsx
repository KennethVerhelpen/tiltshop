import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import { ArrowForwardRounded } from '@mui/icons-material';

import { getAwsImageUrl } from '../../lib/utils';
import { TopicType, TypeType } from '../../lib/types';
import * as S from './topic.styles';

export type TopicProps = {
	index?: number;
	topic?: TopicType;
	type?: TypeType;
	className?: string;
}

export const Topic = (props: TopicProps) => {
	const { type, topic ,index ,className } = { ...props };

	return (
		<Link href={`${type ? type.slug : topic.typeSlug}/${topic.slug}`}>
			<article className={clsx(className, 'cursor-pointer')}>
				<S.Shape
					className={'bg-primary-900 width-100 relative cursor-pointer layout-column layout-align-end-stretch text-center overflow-hidden rounded-xl shadow-3'}>
					<S.Main className={'p-16 content layout-column layout-align-center-center'}>
						<S.Title className={'text-primary-100 h2 strong mb-8'}>{topic.name}</S.Title>
						<span className={'p text-capitalize text-primary-100'} style={{ opacity: 0.5 }}>{type ? type.name : topic.typeName}</span>
					</S.Main>
					<S.Footer className={clsx(topic.articlesCount > 0 ? 'layout-align-start-center' : 'layout-align-center-center', 'px-32 py-16 layout-row')}>
						{topic.articlesCount > 0
						?	<>
								<span className={'small text-left flex text-primary-100 text-truncate'}>See all <b>{topic.articlesCount}</b> articles</span>
								<S.IconButton className={'text-primary-100 layout layout-align-center-center p-8 rounded'}>
									<ArrowForwardRounded style={{ fontSize: 16 }}/>
								</S.IconButton>
							</>
						: <S.Soon className={'flex small py-8 px-16 rounded-sm text-primary-100'}>Coming soon</S.Soon>
						
					}
					</S.Footer>
					<S.ImagePosition className={'rounded-md overflow-hidden absolute'}>
						<S.ImageWrapper className={'rounded-md overflow-hidden relative'}>
							<Image
								layout={'fill'}
								objectFit={'cover'}
								objectPosition={'center'}
								priority={index <= 16}
								loading={index <= 50 ? 'eager' : 'lazy'}
								src={getAwsImageUrl(`/images/topics/${topic.slug}/thumbnail.jpg`)}
								alt={topic.name}
							/>
						</S.ImageWrapper>
					</S.ImagePosition>
				</S.Shape>
			</article>
		</Link>
	)
}