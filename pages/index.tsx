import { useState } from "react";

import { Page, Topic, Header, SearchView } from "../components";
import { generateData } from "../lib/data-generator";
import { generateRecords } from "../lib/records-generator";
import { TypeType, TopicRecordType } from "../lib/types/types";
import { types } from "../lib/data";
import { pushAlgoliaRecords, algoliaClient, algoliaTopicsIndexName } from "./api/algolia";

type HomeProps = {
  types: TypeType[];
};

const Home = (props: HomeProps) => {
	const { types } = { ...props };
	const [historySlug, setHistorySlug] = useState(null);

	const getHistorySlug = (slug: string) => {
		setHistorySlug(slug);
	}

	return (
		<Page
			types={types}
			history={historySlug}
		> 
			<Header	rotation={true}/>
			<SearchView
				indexName={algoliaTopicsIndexName}
				searchClient={algoliaClient}
				hitComponent={Topics}
				hitsPerPage={51}
				filters={false}
			/>
		</Page>
	);
};

export type TopicsProps = {
  hit: TopicRecordType;
};

export const Topics = (props: TopicsProps) => {
	const { hit } = { ...props };
	const type = types.find(type => type.name === hit.type);

  return (
		<div key={hit.id} className="fade-in-bottom speed-5 cascade p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
			<Topic className="flex layout-column layout-align-center-center" count={hit.articlesCount} topic={hit} type={type}/>
		</div>
  );
}

export async function getStaticProps() {
	generateData();
	generateRecords();
	pushAlgoliaRecords();

  return {
    props: {
      types
    }
  }
}

export default Home
