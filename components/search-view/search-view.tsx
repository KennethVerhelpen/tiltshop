import { ReactNode } from "react";
import { InstantSearch } from "react-instantsearch-dom";
import { SortingItemType } from "../../lib/types/types";
import {
		SearchBar,
		SearchSortingSelect,
		SearchPagination,
		SearchFiltersMenu,
		SearchCurrentFilters,
		SearchResultsWrapper,
		SearchResults
} from "../index";

export type Props =  {
  hitComponent: ReactNode;
  hitsPerPage?: number;
  filters?: boolean;
  searchBar?: boolean;
  searchClient: ReactNode;
  indexName: string;
  sortingItems?: SortingItemType[];
  sortingDefaultItem?: string;
}

export const SearchView = (props: Props) => {
  const { hitComponent, hitsPerPage, filters, searchClient, indexName, searchBar, sortingDefaultItem, sortingItems } = { ...defaultProps, ...props };

  return(
    <InstantSearch searchClient={searchClient} indexName={indexName}>
      {searchBar ? <SearchBar className="fade-in-bottom speed-3"/> : null }
      {filters || (sortingItems && sortingDefaultItem) ?
        <div className="layout-row container-lg layout-align-start-center">
          {filters ? 
            <>
              <SearchCurrentFilters className="layout-row flex"/>
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
    </InstantSearch>
  )
}

export const defaultProps = {
  hitsPerPage: 21,
  filters: true,
  searchBar: true
}