import { useContext } from 'react';

import { Page } from '../components';
import { SearchView } from '../views';
import { ThemeContext } from './_app';
import { algoliaSearchClient, algoliaArticlesIndexName } from './api/algolia';

const Search = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<Page
				menu={false}
				theme={theme}
				activePage={'browse'}
			>
				<SearchView
					theme={theme}
					searchClient={algoliaSearchClient}
					indexName={algoliaArticlesIndexName}
				/>
			</Page>
		</>
	);
};

export default Search
