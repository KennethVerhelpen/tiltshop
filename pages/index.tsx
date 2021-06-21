import prisma from "../lib/prisma";
import { Page, Topic, Header, SearchView } from "../components";
import { TypeType, ArticleType, TopicType } from "../lib/types/types";
import { pushAlgoliaRecords, algoliaTopicsIndexName, algoliaSearchClient } from "./api/algolia";

type HomeProps = {
  types: TypeType[];
	articles: ArticleType[];
};

const Home = (props: HomeProps) => {
	const { types } = { ...props };
	
	return (
		<Page
			types={types}
		> 
			<Header	rotation={true}/>
			<SearchView
				indexName={algoliaTopicsIndexName}
				searchClient={algoliaSearchClient}
				hitComponent={Topics}
				hitsPerPage={51}
				filters={false}
			/>
		</Page>
	);
};

export type TopicsProps = {
  hit: TopicType;
};

export const Topics = (props: TopicsProps) => {
	const { hit } = { ...props };

  return (
		<div key={hit.id} className="fade-in-bottom speed-5 cascade p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
			<Topic className="flex layout-column layout-align-center-center" topic={hit}/>
		</div>
  );
}

export async function getStaticProps() {
	const types = await prisma.type.findMany();
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
