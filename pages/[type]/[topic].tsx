import { useContext } from 'react';

import prisma from '../../lib/prisma';
import { TypeType, TopicType, ArticleType } from '../../lib/types';
import { Page} from '../../components/index';
import { TopicView } from '../../views';
import { ThemeContext } from '../_app';

type Props = {
  type: TypeType;
  types: TypeType[];
  topic: TopicType;
  articles: ArticleType[];
}

const Topic = (props: Props) => {
	const { type, topic, articles, types } = { ...props };
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Page
        menu={false}
        theme={theme}
        types={types}
        title={`Best ${topic.articlesCount >= 20 ? '20+' : '10+' } products for ${topic.name} lovers`}
        history={`/${type.slug}`}
        bgImageUrl={`/images/topics/${topic.slug}/cover.gif`}
        >
          <TopicView topic={topic} type={type} articles={articles} theme={theme}/>
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
}

export async function getStaticProps({
  params: {
    topic: topicSlug,
    type: typeSlug
  }}){

  const types = await prisma.type.findMany();
  const currentTopic = await prisma.topic.findUnique({ where: { slug: topicSlug } });
  const currentType = await prisma.type.findUnique({ where: { slug: typeSlug } });
  const currentArticles = await prisma.article.findMany({ where: { topicId: currentTopic.id } });
  await prisma.$disconnect();

  await prisma.$disconnect();

  return {
    props: {
      types,
      type: currentType,
      topic: currentTopic,
      articles: currentArticles,
    }
  }
}

export default Topic;