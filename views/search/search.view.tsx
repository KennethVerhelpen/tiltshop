import { ArticleType, ThemeType } from '../../lib/types';
import { Header, SearchContainer, Article } from '../../components';
import { SearchClient } from 'algoliasearch';
			
export type SearchViewProps = {
  searchClient: SearchClient;
  indexName: string;
  theme: ThemeType;
} 

type HitComponent = {
	hit: ArticleType;
}

const HitComponent = (props: HitComponent) => {
	const { hit } = { ...props };
  return (
		<div key={hit.id} className={'p-16 layout-row layout-align-center-center flex-33 flex-xs-100 flex-sm-50'}>
			<Article className={'flex'} article={hit}/>
		</div>
  );
}

const sortingArticlesItem = [
  { value: 'tiltshop-articles', label: 'Featured' },
  { value: 'tiltshop-articles_price_asc', label: 'Price asc.' },
  { value: 'tiltshop-articles_price_desc', label: 'Price desc.' },
]

export const SearchView = (props: SearchViewProps) => {
	const { searchClient, indexName, theme  } = { ...props };
  
  return (
    <>
      <Header
        align={'center'}
        animated={false}
        theme={theme}
        className={'container-xl pt-128 pb-64 container-lg px-24'}
        title={'Browse all items'}
        topic={'Easily find all items hand-picked just for you.'}
      />
      <SearchContainer
        theme={theme}
        searchClient={searchClient}
        indexName={indexName}
        hitComponent={HitComponent}
        hitsPerPage={21}
        filters={true}
        sortingDefaultItem={'tiltshop-articles'}
        sortingItems={sortingArticlesItem}
      />
    </>
  )
}