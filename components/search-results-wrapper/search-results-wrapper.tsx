import Link from 'next/link';
import { ReactNode } from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

export type Props = {
  children: ReactNode;
}

export const SearchResultsWrapper = (props: Props) => {
  const { children } = { ...props }

  const Results = connectStateResults(({ searchState, searchResults, children }) =>
		searchResults && searchResults.nbHits !== 0  ? (children) : (
			<>
				<div className={'layout-column layout-align-center-center py-128 text-center container-sm'}>
					<span className={'h4 bold mb-8'}>Nothing found</span>
					<span className={'mb-16'}>No results have been found for your keyword. Try another!</span>
					<Link href={'/search'}>
						<a className={'underline'}>Browse all articles</a>
					</Link>
				</div>
			</>
		)
	);

	return (
    <Results>
      {children}
    </Results>
  )
}