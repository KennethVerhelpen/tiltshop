import clsx from 'clsx';

import { PostType } from '../../lib/types';
import { Header, Post, RegisterForm } from '../../components';

import * as S from './blog.view.styles';
			
export type BlogViewProps = {
	posts: PostType[];
}

export const BlogView = (props: BlogViewProps) => {
	const { posts } = { ...props };
  
  return (
    <>
      <Header
				title={'Latest articles'}
				subtitle={
					<span>Our experts carefully and insatiably review <b>movies</b>, <b>tv shows</b> and <b>video games related products</b> from the web.</span>
				}
			/>
			<S.Grid className={'p-0 layout-column'}>
				<div className={'container-lg layout-row layout-wrap layout-align-start-stretch'}>
					{posts.map((post: PostType, index: number) => (
						<div
							key={post.slug}
							className={clsx(
								index ? `flex-order-${index}` : null,
								'fade-in-bottom speed-5 cascade p-16 width-100 layout-column layout-align-start-center flex-33 flex-xs-100 flex-sm-50'
							)}
						>
							<Post post={post}/>
						</div>
					))}
					<div className={'flex-order-3 fade-in-bottom speed-5 cascade p-16 width-100 layout-column layout-align-start-center flex-33 flex-xs-100 flex-sm-50'}>
						<RegisterForm />
					</div>
				</div>
			</S.Grid>
    </>
  )
}