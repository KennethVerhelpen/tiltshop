import prisma from '../../lib/prisma';
import markdownToHtml from '../../lib/markdownToHtml'
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { getFormatedDate, getReadingTime } from '../../lib/utils';
import { PostType, ArticleType, TypeType, TopicType } from '../../lib/types';
import { Page } from '../../components';
import { PostView } from '../../views';

type Props = {
	post: PostType;
	articles: ArticleType[];
	topics: TopicType[];
	types: TypeType[];
}

export const Post = (props: Props) => {
  const { post, articles, topics, types } = { ...props };

	return (
		<Page
				menu={false}
				theme={'dark'}
				ogImageUrl={post.ogImage.url}
				title={`${post.title} - Tiltshop`}
				description={post.date}
				history={`/blog`}
			>
			<PostView topics={topics} types={types} articles={articles} post={post}/>
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
		'coverImage',
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

	currentPost['content'] = await markdownToHtml(currentPost.content || '');
	currentPost['date'] = getFormatedDate(currentPost.date);
	currentPost['time'] = getReadingTime([currentPost.content, currentPost.excerpt, currentPost.outro]);

	const currentArticlesSlugs: string[] = currentPost['featuredArticles']?.map(featuredArticle => (featuredArticle.slug));
	const currentArticles = await prisma.article.findMany({
		where : { 
			slug: { in: currentArticlesSlugs }
		}
	});

	const currentTopicsId: number[] = currentArticles.map(article => article.topicId);
	const currentTopics = await prisma.topic.findMany({
		where : {
			id: {
				in: currentTopicsId
			}
		}
	});

	const currentTypesId: number[] = currentArticles.map(article => article.typeId);
	const currentTypes = await prisma.type.findMany({
		where : {
			id: {
				in: currentTypesId
			}
		}
	});

	return {
		props: {
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
};


export default Post;