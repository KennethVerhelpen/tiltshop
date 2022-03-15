import React, { useState } from 'react';

import { getAllPosts } from '../lib/posts';
import { PostType, ThemeType } from "../lib/types";
import { getFormatedDate, getReadingTime } from '../lib/utils';

import { Page } from '../components';
import { BlogView } from '../views';

type Props = {
  posts: PostType[];
}

export const Blog = (props: Props) => {
	const { posts } = { ...props };

	return (
		<Page
			activePage={'browse'}
			menu={false}
		>
			<BlogView posts={posts}/>
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
		post['time'] = getReadingTime([post.content]);
		return (post)
	})

  return {
    props: {
      posts: allPostsFormated,
    }
  }
}