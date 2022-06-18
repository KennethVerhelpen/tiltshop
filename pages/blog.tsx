import React, { useContext } from 'react';

import { getAllPosts } from '../lib/posts';
import { PostType, TypeType } from "../lib/types";
import { getFormatedDate, getReadingTime } from '../lib/utils';

import { Page } from '../components';
import { BlogView } from '../views';
import { ThemeContext } from './_app';
import prisma from '../lib/prisma';

type Props = {
	types: TypeType[];
  posts?: PostType[];
}

export const Blog = (props: Props) => {
	const { posts, types } = { ...props };
	const { theme } = useContext(ThemeContext);

	return (
		<Page
			menu={false}
			types={types}
		>
			<BlogView theme={theme} posts={posts}/>
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

	const allPostsFormated = allPosts?.map((post: PostType) => {
		post['date'] = getFormatedDate(post.date);
		post['time'] = getReadingTime([post.content]);
		return post
	})

	const types =  await prisma.type.findMany();

  return {
    props: {
			types,
      posts: allPostsFormated,
    }
  }
}