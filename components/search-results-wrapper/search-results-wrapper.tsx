import { ReactNode } from "react";
import { connectStateResults } from "react-instantsearch-dom";

export type Props = {
  children: ReactNode;
}

export const SearchResultsWrapper = (props: Props) => {
  const { children } = { ...props }

  const Results = connectStateResults(({ searchState, searchResults, children }) =>
		searchResults && searchResults.nbHits !== 0 ? (children) : (
			<div className="layout-column layout-align-center-center py-128 text-center container-sm">
				<span className="h4 bold mb-8">Nothing found</span>
				<span>No results have been found for <b className="text-truncate display-block">{searchState.query}.</b></span>
			</div>
		)
	);

	return (
    <Results>
      {children}
    </Results>
  )
}