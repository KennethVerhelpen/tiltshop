import { useState, useRef, Fragment } from 'react';
import clsx from 'clsx';

import { PostType, FormDataType, ThemeType } from '../../lib/types';
import { Header, Post, RegisterForm } from '../../components';

import * as S from './blog.view.styles';
import { FeedTwoTone, MarkunreadMailboxTwoTone } from '@mui/icons-material';
			
export type BlogViewProps = {
	posts: PostType[];
	theme: ThemeType;
}

export const BlogView = (props: BlogViewProps) => {
	const { posts, theme } = { ...props };

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
				theme={theme}
				className={'pt-128 pb-64 container-sm'}
				title={'Latest articles'}
				subtitle={
					`<span>Our experts carefully and insatiably review <b>movies</b>, <b>tv shows</b> and <b>video games related products</b> from the web.</span>`
				}
			/>
			{posts.length > 4
				? <S.Grid className={'p-0 layout-column pb-128'}>
						<div className={'container-xl layout-row layout-wrap layout-align-start-stretch'}>
							{posts.map((post: PostType, index: number) => (
								<Fragment key={post.slug}>
									<div className={'p-8 layout-column layout-align-start-center flex-33 flex-xs-100 flex-sm-50'}>
										<Post className={'width-100'} post={post} theme={theme}/>
									</div>
									{posts.length > 3 && index === 3 || posts.length < 3 && index === 0 ? 
										<div className={'p-8 layout-column layout-align-start-center flex-33 flex-xs-100 flex-sm-50'}>
											<RegisterForm/>
										</div>
										: null
									}
								</Fragment>
							))}
						</div>
					</S.Grid>
				: <S.Form onSubmit={subscribe} className={clsx(theme === 'dark' ? 'bg-primary-100' : 'bg-primary-900', 'layout-column layout-align-start-stretch  p-32 rounded-lg')}>
						<header className={'layout-column layout-align-center-center text-center'}>
							{ (form === null || form?.state === undefined) && (
								<>
									<FeedTwoTone style={{ fontSize: 32 }} className={'mb-32 text-primary-400'}/>
									<h3 className={clsx(theme === 'dark' ? 'text-primary-900' : 'text-primary-100', 'h5 bold mb-8')}>There is no blog post at the moment.</h3>
									<p className={clsx(theme === 'dark' ? 'text-primary-500' : 'text-primary-400')}>Stay tuned for the upcoming news by subscribing to our newsletter here:</p>
								</>
							)}
							{ form?.state === 'success' && (
								<>
									<MarkunreadMailboxTwoTone style={{ fontSize: 32 }} className={'mb-32 text-primary-400'}/>
									<h3 className={clsx(theme === 'dark' ? 'text-primary-900' : 'text-primary-100', 'h3 strong mb-8')}>Hooray!</h3>
									<p className={'text-primary-500'}>You're now on the list.</p>
								</>
							)}
							{ form?.state === 'error' && (
								<>
									<h3 className={clsx(theme === 'dark' ? 'text-primary-900' : 'text-primary-100', 'h3 strong mb-8')}>Oops!</h3>
									<p className={'text-primary-500 mb-16'}>{form.message}</p>
									<button className={clsx(theme === 'dark' ?'text-primary-100 bg-primary-900' : 'text-primary-900 bg-primary-100', 'btn btn-md btn-raised width-100')} onClick={() => setForm(undefined)}>Go back</button>
								</>
							)}
							{ form?.state === 'loading' && (
								<p className={'text-primary-500'}>Subscribing...</p>
							)}
						</header>
						{(form === null || form?.state === undefined)
							?
								<main className="layout-column layout-align-start-start mt-16">
									<S.Input
										id={'email-input'}
										name={'email'}
										ref={emailInputDefault}
										required
										type={'email'}
										className={'flex-grow bg-primary-300 text-primary-900 px-8 width-100 border-none rounded-sm mb-16'}
										placeholder={'Enter your email here...'}
									/>
									<button className={clsx(theme === 'dark' ? 'text-primary-100 bg-primary-900' : 'text-primary-900 bg-primary-100', 'btn btn-md btn-raised width-100')} type={'submit'}>Register now</button>
								</main>
							: null 
						}
					</S.Form>
				}
    </>
  )
}