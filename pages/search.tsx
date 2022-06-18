import { useContext } from 'react';

import { Page } from '../components';
import { SearchView } from '../views';
import { ThemeContext } from './_app';
import { algoliaSearchClient, algoliaArticlesIndexName } from './api/algolia';
import prisma from '../lib/prisma';
import { ThemeType, TypeType } from '../lib/types';

type SearchProps = {
	types: TypeType[];
}

const Search = (props:SearchProps) => {
	const { types } = { ...props };
	const { theme } = useContext(ThemeContext);

	return (
		<>
			<Page
				menu={false}
				theme={theme}
				types={types}
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

export async function getStaticProps(){

	const types =  await prisma.type.findMany();

  return {
    props: {
			types,
    }
  }
}

export default Search
