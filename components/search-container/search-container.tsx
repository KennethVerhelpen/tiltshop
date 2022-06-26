import { ReactNode } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { SortingItemType, ThemeType } from '../../lib/types';
import {
		SearchBar,
		SearchSortingSelect,
		SearchPagination,
		SearchFiltersMenu,
		SearchCurrentFilters,
		SearchResultsWrapper,
		SearchResults
} from '../index';

export type SearchContainerProps =  {
  hitComponent: ReactNode;
  hitsPerPage?: number;
  filters?: boolean;
  searchBar?: boolean;
  searchClient: ReactNode;
  indexName: string;
  sortingItems?: SortingItemType[];
  sortingDefaultItem?: string;
  theme?: ThemeType;
}

export const SearchContainer = (props: SearchContainerProps) => {
  const { hitComponent, hitsPerPage, filters, searchClient, indexName, searchBar, sortingDefaultItem, sortingItems, theme } = { ...defaultProps, ...props };

  return(
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      <div className={'container-lg'}>
        {searchBar ? 
          <div className={'layout-row layout-align-center-center'}>
            <div className={'flex-100 flex-gt-sm-50'}>
              <SearchBar theme={theme}/>
            </div>
          </div>
          : null
        }
        {filters || (sortingItems && sortingDefaultItem) ?
          <div className={'layout-row layout-align-start-center'}>
            {filters ? 
              <>
                <SearchCurrentFilters className={'layout-row flex'} theme={theme}/>
                <SearchFiltersMenu/>
              </>
            : null }
            {(sortingItems && sortingDefaultItem) ? <SearchSortingSelect defaultItem={sortingDefaultItem} items={sortingItems}/> : null }
          </div> : null
        }
        <SearchResultsWrapper>
          <SearchResults hitComponent={hitComponent} hitsPerPage={hitsPerPage}/>
          <SearchPagination />
        </SearchResultsWrapper>
      </div>
    </InstantSearch>
  )
}

export const defaultProps = {
  hitsPerPage: 21,
  filters: true,
  searchBar: true
}