import prisma from '../lib/prisma';
import { TypeType, TopicType } from '../lib/types';
import { Page } from '../components';
import { HomeView } from '../views';
import '@algolia/autocomplete-theme-classic';

import { populateTopicsData, populateArticlesData } from '../lib/utils';
import { pushAlgoliaRecords } from "./api/algolia";

type HomeProps = {
  types: TypeType[];
  topics: TopicType[];
};

const Home = (props: HomeProps) => {
	const { types, topics } = { ...props };
	
	return (
		<Page types={types} theme={'dark'} footer={false}>
      <HomeView topics={topics} types={types}/>
		</Page>
	);
};

export async function getStaticProps() {
	const types = await prisma.type.findMany();
  const topics = await prisma.topic.findMany();
  const populatedTopics = await populateTopicsData(topics, types);
  
  // TIP: Uncomment to push new indexes to Algolia;
  // const articles = await prisma.article.findMany();
  // const populatedArticles = await populateArticlesData(articles, topics, types);
	// pushAlgoliaRecords(populatedArticles, types, populatedTopics);
  
  await prisma.$disconnect();

  return {
    props: {
      types,
      topics: populatedTopics,
    }
  }
}

export default Home
