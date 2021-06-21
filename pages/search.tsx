import { Page, Header, Article, SearchView } from "../components";
import { algoliaSearchClient, algoliaArticlesIndexName } from "./api/algolia";
import { ArticleType } from '../lib/types/types';

const Search = () => {

	const sortingArticlesItem = [
		{ value: 'tiltshop-articles', label: 'Featured' },
		{ value: 'tiltshop-articles_price_asc', label: 'Price asc.' },
		{ value: 'tiltshop-articles_price_desc', label: 'Price desc.' },
	]

	return (
		<>
			<Page
				activePage={"browse"}
				menu={false}
			>
				<Header
					title="Browse all items"
					subtitle="Easily find all items hand-picked just for you."
				/>
				<SearchView
					searchClient={algoliaSearchClient}
					indexName={algoliaArticlesIndexName}
					hitComponent={Articles}
					hitsPerPage={21}
					filters={true}
					sortingDefaultItem="tiltshop-articles"
					sortingItems={sortingArticlesItem}
				/>
			</Page>
		</>
	);
};

export type Articles = {
	hit: ArticleType;
}

const Articles = (props: Articles) => {
	const { hit } = { ...props };
  return (
		<div key={hit.id} className="p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50">
			<Article className="flex" article={hit}/>
		</div>
  );
}

export default Search
