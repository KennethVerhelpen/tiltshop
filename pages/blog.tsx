import React, { useRef, useState, } from 'react';
import { Page, Header, Post } from "../components";
import { PostType } from "../lib/types/types";
import { getAllPosts } from '../lib/posts';
import { getFormatedDate, getReadingTime } from '../lib/utils';
import styled from "@emotion/styled";
import clsx from "clsx";
import { EmailTwoTone, MarkunreadMailboxTwoTone } from '@material-ui/icons';

const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

const Input = styled.input`
	height: 2.5rem;
	outline: none;
	background-color: rgba(256,256,256,0.2);
	border: 1px solid transparent;
	&:focus {
		border: 1px solid white;
	}
`

type Props = {
  posts: PostType[];
	allPostParsed: PostType[];
}

export const Blog = (props: Props) => {
	const [form, setForm] = useState(null);
	const emailInput = useRef(null);
	const { posts, allPostParsed } = { ...props };

  const subscribe = async (e) => {
    e.preventDefault();
    setForm({ state: 'loading' });

    const res = await fetch('/api/subscribe', {
      body: JSON.stringify({
        email: emailInput.current.value
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

    emailInput.current.value = '';
    setForm({
      state: 'success',
      message: `Hooray!`
    });
  };

	return (
		<Page
			activePage={"browse"}
			menu={false}
		>
			<Header
				title="Latest articles"
				subtitle={
					<span>Our experts carefully and insatiably review <b>movies</b>, <b>tv shows</b> and <b>video games related products</b> from the web.</span>
				}
			/>
			<Grid className="p-0 layout-column">
				<div className="container-lg layout-row layout-wrap layout-align-start-stretch">
					{posts.map((post: PostType, index: number) => (
						<div key={post.slug} className={`flex-order-${index} fade-in-bottom speed-5 cascade p-16 width-100 layout-column layout-align-start-center flex-33 flex-xs-100 flex-sm-50`}>
							<Post post={post}/>
						</div>
					))}
					{/* {console.log("ALL", allPostParsed)} */}
					<div className={`flex-order-3 fade-in-bottom speed-5 cascade p-16 width-100 layout-column layout-align-start-center flex-33 flex-xs-100 flex-sm-50`}>
						<form onSubmit={subscribe} className="text-center rounded-xl layout-column layout-align-center-center bg-secondary-900 width-100 flex p-32">
							{ form ?
								<main className="layout-column layout-align-center-center">
									{ form.state === 'success' && (
										<div className="layout-column layout-align-center-center">
											<MarkunreadMailboxTwoTone style={{ fontSize: 32 }} className="mb-32 text-secondary-100"/>
											<span className="h3 strong serif text-secondary-100 mb-16">Hooray!</span>
											<span className="small text-secondary-100">You're now on the list.</span>
										</div>
									)}
									{ form.state === 'error' && (
										<div className="layout-column layout-align-center-center">
											<span className="h3 strong serif text-secondary-100 mb-16">Oops!</span>
											<span className="small text-secondary-100 mb-32">{form.message}</span>
											<button className="btn btn-md btn-raised width-100" onClick={() => setForm(undefined)}>Go back</button>
										</div>
									)}
									{ form.state === 'loading' && (
										<div className="layout-column layout-align-center-center">
											<span className="small text-secondary-100 mb-32">Subscribing...</span>
										</div>
									)}
								</main> : null
							}
							<main className={clsx({ "hide" : form },"layout-column layout-align-center-center")}>
								<EmailTwoTone style={{ fontSize: 32 }} className="mb-32 text-secondary-100"/>
								<span className="h3 strong serif text-secondary-100 mb-16">Stay tuned about our latest articles</span>
								<span className="small text-secondary-100 mb-16">Register to our free newsletter and get the latest reviews directly in your mailbox.</span>
								<Input
									id="email-input"
									name="email"
									ref={emailInput}
									required
									type="email"
									className="text-secondary-100 px-8 border-none rounded-sm width-100 mb-16"
									placeholder="Enter your email here..."
								/>
								<button className="btn btn-md btn-raised width-100" type="submit">Register now</button>
							</main>
						</form>
					</div>
				</div>
			</Grid>
		</Page>
	);
};

export default Blog;

export async function getStaticProps(){

	const allPosts = getAllPosts([
		'title',
		'date',
		'slug',
		'author',
		'content',
		'coverImage'
	]);

	const allPostsFormated = allPosts.map((post: PostType) => {
		post['date'] = getFormatedDate(post.date);
		post['time'] = getReadingTime(post.content);
		return (post)
	})

  return {
    props: {
      posts: allPostsFormated,
    }
  }
}