import { useState, useRef } from 'react';
import clsx from 'clsx';

import { PostType, FormDataType } from '../../lib/types';
import { Header, Post, RegisterForm } from '../../components';

import * as S from './blog.view.styles';
import { MarkunreadMailboxTwoTone } from '@material-ui/icons';
			
export type BlogViewProps = {
	posts: PostType[];
}

export const BlogView = (props: BlogViewProps) => {
	const { posts } = { ...props };
	const [form, setForm] = useState<FormDataType>(null);
	const emailInputDefault = useRef(null);

	const subscribe = async (e) => {
		e.preventDefault();
		setForm({ state: 'loading' });

		const res = await fetch('/api/subscribe', {
			body: JSON.stringify({
				email: emailInputDefault.current.value
			}),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		});

		const { error } = await res.json();
		if (error) {
			setForm({
				state: 'error',
				message: error
			});
			return;
		}
		// emailInputDefault.current.value = '';
		setForm({
			state: 'success',
			message: `Hooray!`
		});
	};
  
  return (
    <>
      <Header
				title={'Latest articles'}
				subtitle={
					<span>Our experts carefully and insatiably review <b>movies</b>, <b>tv shows</b> and <b>video games related products</b> from the web.</span>
				}
			/>
			{posts.length > 0
				? <S.Grid className={'p-0 layout-column'}>
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
								<RegisterForm/>
							</div>
						</div>
					</S.Grid>
				: <S.Form onSubmit={subscribe} className="layout-column layout-align-start-stretch border p-32 rounded-md">
						<header className="layout-column layout-align-center-center text-center">
							{ (form === null || form?.state === undefined) && (
								<>
									<h3 className="h5 strong mb-8">There is no blog post at the moment.</h3>
									<p>Stay tuned for the upcoming news by subscribing to our newsletter here:</p>
								</>
							)}
							{ form?.state === 'success' && (
								<>
									<MarkunreadMailboxTwoTone style={{ fontSize: 32 }} className={'mb-32 text-secondary-900'}/>
									<h3 className={'h3 strong mb-8'}>Hooray!</h3>
									<p>You're now on the list.</p>
								</>
							)}
							{ form?.state === 'error' && (
								<>
									<h3 className={'h3 strong mb-8'}>Oops!</h3>
									<p className="mb-16">{form.message}</p>
									<button className={'btn btn-md btn-raised width-100'} onClick={() => setForm(undefined)}>Go back</button>
								</>
							)}
							{ form?.state === 'loading' && (
								<p>Subscribing...</p>
							)}
						</header>
						{(form === null || form?.state === undefined)
							?
								<main className="layout-row layout-align-start-start mt-16">
									<S.Input
										id={'email-input'}
										name={'email'}
										ref={emailInputDefault}
										required
										type={'email'}
										className={'flex-grow text-secondary-900 px-8 border border-secondary-300 rounded-sm mr-16'}
										placeholder={'Enter your email here...'}
									/>
									<button className={'btn btn-md btn-raised btn-secondary width-100'} type={'submit'}>Register now</button>
								</main>
							: null 
						}
					</S.Form>
				}
    </>
  )
}