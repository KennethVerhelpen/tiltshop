import { useContext } from 'react';

import prisma from '../lib/prisma';
import { TypeType, TopicType } from '../lib/types';
import { Page } from '../components';
import { HomeView } from '../views';
import { populateTopicsData } from '../lib/utils';
// import { populateArticlesData } from '../lib/utils';
// import { pushAlgoliaRecords } from './api/algolia';
import { ThemeContext } from './_app';

type HomeProps = {
  types: TypeType[];
  topics: TopicType[];
};

const Home = (props: HomeProps) => {
	const { types, topics } = { ...props };
  const { theme } = useContext(ThemeContext);
	
	return (
		<Page types={types} footer={false}>
      <HomeView theme={theme} topics={topics} types={types}/>
		</Page>
	);
};

export async function getStaticProps() {
	const types = await prisma.type.findMany();
  const topics = await prisma.topic.findMany({
    include: {
			_count: {
				select: {
					articles: true
				}
			}
		}
  });
  const populatedTopics = await populateTopicsData(topics, types);
  
  // TIP: Uncomment to push new indexes to Algolia;
  // const articles = await prisma.article.findMany();
  // const populatedArticles = await populateArticlesData(articles, topics, types);
	// pushAlgoliaRecords(populatedArticles, populatedTopics);
  
  await prisma.$disconnect();

  return {
    props: {
      types,
      topics: populatedTopics,
    }
  }
}

export default Home
