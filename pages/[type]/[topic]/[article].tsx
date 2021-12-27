
import prisma from '../../../lib/prisma';
import { TypeType, TopicType, ArticleType } from '../../../lib/types';
import { Page } from '../../../components';
import { ArticleView } from '../../../views';

type Props = {
  type: TypeType;
  topic: TopicType;
	article: ArticleType;
  articles: ArticleType[];
}

export const ArticleDetails = (props: Props) => {
	const {type, topic, article, articles} = { ...props };
	return (
		<>
			<Page
				menu={false}
				title={`${article.title} - ${topic.name}`}
				description={article.description}
				history={`/${type.slug}/${topic.slug}`}
			>
				<ArticleView articles={articles} article={article} topic={topic} type={type}/>
			</Page>
		</>
	);
};

export async function getStaticPaths() {
	const articles = await prisma.article.findMany();
	const topics = await prisma.topic.findMany();
	const types = await prisma.type.findMany();
	await prisma.$disconnect();

  const paths = articles.map(article => {
		const currentType = types.find(type => type.id === article.typeId)
		const currentTopic = topics.find(topic => topic.id === article.topicId)
		return {	
			params: {
				type: currentType.slug.toString(),
				topic: currentTopic.slug.toString(),
				article: article.slug.toString(),
			}
		}
	})

  return {
		paths,
		fallback: false,
  }
};

export async function getStaticProps({
  params: {
		type: typeSlug,
		topic: topicSlug,
		article: articleSlug
	}}) {

	const currentType = await prisma.type.findUnique({
		where: {
			slug: typeSlug
		}
	});
	const currentTopic = await prisma.topic.findUnique({
		where: {
			slug: topicSlug
		}
	});
	const currentArticle = await prisma.article.findUnique({
		where: {
			slug: articleSlug
		}
	});
	const similarArticles = await prisma.article.findMany({
		where: {
			slug: {
				not: articleSlug
			},
			topicId: currentTopic.id,
			typeId: currentType.id
		}, take: 3
	});

	await prisma.$disconnect();

  return {
    props: {
			type: currentType,
			topic: currentTopic,
			article: currentArticle,
			articles: similarArticles,
    }
  }
}

export default ArticleDetails;