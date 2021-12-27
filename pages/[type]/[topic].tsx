import prisma from '../../lib/prisma';
import { TypeType, TopicType, ArticleType } from '../../lib/types';
import { Page} from '../../components/index';
import { TopicView } from '../../views';

type Props = {
  type: TypeType;
  topic: TopicType;
  articles: ArticleType[];
}

const Topic = (props: Props) => {
	const { type, topic, articles } = { ...props };

  return (
    <>
      <Page
        menu={false}
        title={`Best ${topic.articlesCount >= 20 ? '20+' : '10+' } products for ${topic.name} lovers`}
        history={`/${type.slug}`}
        bgImageUrl={`/images/topics/${topic.slug}/cover.gif`}
        >
          <TopicView topic={topic} type={type} articles={articles} />
      </Page>
    </>
  );
};

export async function getStaticPaths() {
  const topics = await prisma.topic.findMany();
  const types = await prisma.type.findMany();
  await prisma.$disconnect();

  const paths = topics.map((topic => {
    const type = types.find(type => type.id === topic.typeId)
    return {
      params: {
        type: type.slug,
        topic: topic.slug
      }
    }
  }));

  return {
    paths,
    fallback: false
  }
};

export async function getStaticProps({
  params: {
    topic: topicSlug,
    type: typeSlug
  }}){

  const currentTopic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
  const currentType = await prisma.type.findUnique({ where: { slug: typeSlug } });
  const currentArticles = await prisma.article.findMany({ where: { topicId: currentTopic.id } });
  await prisma.$disconnect();

  return {
    props: {
      type: currentType,
      topic: currentTopic,
      articles: currentArticles,
    }
  }
}

export default Topic;