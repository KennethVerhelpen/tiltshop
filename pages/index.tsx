import prisma from '../lib/prisma';
import { TypeType, TopicType } from '../lib/types';
import { Page, SearchAutocomplete } from '../components';
import { algoliaTopicsIndexName, algoliaSearchClient } from './api/algolia';
import { HomeView, NewHomeView } from '../views';

import algoliasearch from 'algoliasearch';
import { getAlgoliaResults } from '@algolia/autocomplete-js';

// TIP: Uncomment to push new indexes to Algolia
// import { Topic } from "../components";
// import { ArticleType } from "../lib/types";
// import { pushAlgoliaRecords } from "./api/algolia";

type HomeProps = {
  types: TypeType[];
  topics: TopicType[];
};

const Home = (props: HomeProps) => {
	const { types, topics } = { ...props };
	
	return (
		<Page types={types} theme={'dark'}>
			{/* <SearchAutocomplete
        openOnFocus={true}
        getSources={({ query }) => [
          {
            sourceId: 'topics',
            getItems() {
              return getAlgoliaResults({
                searchClient: algoliaSearchClient,
                queries: [
                  {
                    indexName: 'tiltshop-topics',
                    query,
                  },
                ],
              });
            },
          },
        ]}
      /> */}
			{/* <HomeView searchClient={algoliaSearchClient} indexName={algoliaTopicsIndexName} /> */}
      <NewHomeView topics={topics}/>
		</Page>
	);
};

export async function getStaticProps() {
	const types = await prisma.type.findMany();
  const topics = await prisma.topic.findMany({});

	// TIP: Uncomment to push new indexes to Algolia
	// const topics = await prisma.topic.findMany();
	// const articles = await prisma.article.findMany();
	// pushAlgoliaRecords(articles, types, topics);
	
  return {
    props: {
      types,
      topics,
    }
  }
}

export default Home
