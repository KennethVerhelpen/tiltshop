import { Page } from '../components';
import { SearchView } from '../views';
import { algoliaSearchClient, algoliaArticlesIndexName } from './api/algolia';

const Search = () => {
	return (
		<>
			<Page
				menu={false}
				activePage={'browse'}
			>
				<SearchView
					searchClient={algoliaSearchClient}
					indexName={algoliaArticlesIndexName}
				/>
			</Page>
		</>
	);
};

export default Search
