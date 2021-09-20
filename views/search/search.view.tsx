import { ReactNode } from 'react';
import { ArticleType } from '../../lib/types';
import { Header, SearchContainer, Article } from '../../components';
			
export type SearchViewProps = {
  searchClient: ReactNode;
  indexName: string;
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
	const { searchClient, indexName  } = { ...props };
  
  return (
    <>
      <Header
        title={'Browse all items'}
        subtitle={'Easily find all items hand-picked just for you.'}
      />
      <SearchContainer
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