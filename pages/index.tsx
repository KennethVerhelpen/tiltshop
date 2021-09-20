import prisma from '../lib/prisma';
import { Page } from '../components';
import { TypeType} from '../lib/types';
import { algoliaTopicsIndexName, algoliaSearchClient } from './api/algolia';
import { HomeView } from '../views';

// TIP: Uncomment to push new indexes to Algolia
// import { Topic } from "../components";
// import { ArticleType } from "../lib/types";
// import { pushAlgoliaRecords } from "./api/algolia";

type HomeProps = {
  types: TypeType[];

	// TIP: Uncomment to push new indexes to Algolia
};

const Home = (props: HomeProps) => {
	const { types } = { ...props };
	
	return (
		<Page
			types={types}
		> 
			<HomeView searchClient={algoliaSearchClient} indexName={algoliaTopicsIndexName} />
		</Page>
	);
};

export async function getStaticProps() {
	const types = await prisma.type.findMany();

	// TIP: Uncomment to push new indexes to Algolia
	// const topics = await prisma.topic.findMany();
	// const articles = await prisma.article.findMany();
	// pushAlgoliaRecords(articles, types, topics);
	
  return {
    props: {
      types
    }
  }
}

export default Home
