import { Page } from '../components';
import { SearchView } from '../views';
import { algoliaSearchClient, algoliaArticlesIndexName } from './api/algolia';

const Search = () => {
	return (
		<>
			<Page
				activePage={'browse'}
				menu={false}
			>
				<SearchView searchClient={algoliaSearchClient} indexName={algoliaArticlesIndexName} />
			</Page>
		</>
	);
};

export default Search
