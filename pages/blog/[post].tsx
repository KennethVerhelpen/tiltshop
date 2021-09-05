import { Page } from '../../components';
import markdownToHtml from '../../lib/markdownToHtml'
import { getFormatedDate, getReadingTime } from '../../lib/utils';
import { getPostBySlug, getAllPosts } from '../../lib/posts';
import { PostType, ArticleType, TypeType, TopicType } from '../../lib/types/types';
import { Article } from '../../components';
import prisma from "../../lib/prisma";
import Image from "next/image";

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
				image={post.ogImage.url}
				title={`${post.title} - Tiltshop`}
				description={post.date}
				history={`/blog`}
			>
			<main className="container-lg">
				<div className="layout-column">
					<Image
						quality="100"
						width={'100%'}
						height={'300px'}
						objectFit="cover"
						objectPosition="center"
						priority={true}
						loading={"eager"}
						alt={post.title}
						src={post.coverImage}
						className="rounded-lg shadow-2 overflow-hidden"
					/>
					<div className="layout-column mb-64">
						<h1 className="strong mb-8" style={{ fontSize: 72 }}>{post.title}</h1>
						<span className="mb-16">{post.date}</span>
						<span >{post.author.name}</span>
					</div>
					<p className="h6">{post.excerpt}</p>
					<div className="layout-row">
						<div className="layout-column">
							<div className="h6" dangerouslySetInnerHTML={{__html: post.content}}/>
							{articles ? articles.map((article: ArticleType, index: number) => {
								const articleTopic = topics.find(topic => topic.id === article.topicId)
								const articleType = types.find(type => type.id === article.typeId)
								return (
									<div className="layout-column">
										<div className="layout-row py-64">
											
											<div className="layout-column flex px-16 layout-align-start-start">
												<h3 className="bold mb-16">{post.featuredArticles[index].title || article.title}</h3>
												<span className="mb-32 h6 lh-2">{post.featuredArticles[index].summary}</span>
												<ul className="list-reset mb-32 h6 lh-2">
													{post.featuredArticles[index].benefits.map(benefit =>(
														<li>👍 {benefit}</li>
													))}
													{post.featuredArticles[index].flaws.map(flaw =>(
														<li>❌ {flaw}</li>
													))}
												</ul>
												<button className="btn btn-raised btn-secondary btn-md">See on amazon</button>
											</div>
											<Article article={article} topic={articleTopic} type={articleType}/>
										</div>
									</div>
								)}) : null}
							</div>
							<div className="layout-column" style={{minWidth: 240}}>
								<span>Title</span>
								<span>Title</span>
								<span>Title</span>
								<span>Title</span>
							</div>
						</div>
				</div>
			</main>
		</Page>
	);
};

export async function getStaticProps({
	params: { post: postSlug}
}) {

	const currentPost = getPostBySlug(postSlug, [
		'title',
		'date',
		'slug',
		'author',
		'content',
		'ogImage',
		'coverImage',
		'topicSlug',
		'typeSlug',
		'articles',
		'featuredArticles'
	]) as PostType;

	currentPost['content'] = await markdownToHtml(currentPost.content || '');
	currentPost['date'] = getFormatedDate(currentPost.date);
	currentPost['time'] = getReadingTime(currentPost.content);

	const currentArticlesSlugs: string[] = currentPost['featuredArticles'].map(featuredArticle => (featuredArticle.slug));
	const currentArticles = await prisma.article.findMany({ where : { slug: { in: currentArticlesSlugs } } });
	const currentTopicsId: number[] = currentArticles.map(article => article.topicId);
	const currentTopics = await prisma.topic.findMany({ where : { id: { in: currentTopicsId } } });
	const currentTypesId: number[] = currentArticles.map(article => article.typeId);
	const currentTypes = await prisma.type.findMany({ where : { id: { in: currentTypesId } } });

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