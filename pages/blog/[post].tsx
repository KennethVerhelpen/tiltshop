import prisma from '../../lib/prisma';
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { PostType, ArticleType, TypeType, TopicType } from '../../lib/types';
import { Page } from '../../components';
import { PostView } from '../../views';
import { useContext } from 'react';
import { ThemeContext } from '../_app';

type Props = {
	post: PostType;
	articles: ArticleType[];
	topics: TopicType[];
	types: TypeType[];
	allTypes: TypeType[];
}

export const Post = (props: Props) => {
  const { post, articles, topics, types, allTypes } = { ...props };
	const { theme } = useContext(ThemeContext);

	return (
		<Page
				menu={false}
				ogImageUrl={post.ogImage.url}
				title={`${post.title}`}
				description={post.date}
				history={`/blog`}
				theme={theme}
				types={allTypes}
			>
			<PostView theme={theme} topics={topics} types={types} articles={articles} post={post}/>
		</Page>
	);
};

export async function getStaticProps({
	params: { post: postSlug}
}) {

	const currentPost = getPostBySlug(postSlug, [
		'articles',
		'author',
		'content',
		'date',
		'excerpt',
		'featuredArticles',
		'ogImage',
		'outro',
		'slug',
		'title',
		'topicSlug',
		'typeSlug',
	]) as PostType;

	const currentArticlesSlugs: ArticleType['slug'][] = currentPost['featuredArticles']?.map(featuredArticle => (featuredArticle.slug));
	const currentArticles: ArticleType[] = await prisma.article.findMany({
		where : { 
			slug: { in: currentArticlesSlugs } 
		}
	});

	const currentTopicsId: TopicType['id'][] = currentArticles.map(article => article.topicId);
	const currentTopics: TopicType[] = await prisma.topic.findMany({
		where : {
			id: {
				in: currentTopicsId
			}
		}
	});

	const currentTypesId: TypeType['id'][] = currentArticles.map(article => article.typeId);
	const currentTypes: TypeType[] = await prisma.type.findMany({
		where : {
			id: {
				in: currentTypesId
			}
		}
	});

	const types =  await prisma.type.findMany();

	return {
		props: {
			allTypes: types,
			post: currentPost,
			topics: currentTopics,
			types: currentTypes,
			articles: currentArticles
		},
	}
}

export async function getStaticPaths() {
	const posts = getAllPosts(['slug']);
	const paths = posts.map((post: PostType) => {
		return {	
			params: {
				post: post.slug,
			}
		}
	})

	return {
		paths,
		fallback: false,
	}
}

export default Post;