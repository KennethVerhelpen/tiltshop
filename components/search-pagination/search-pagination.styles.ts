import styled from "@emotion/styled";
import { Pagination } from 'react-instantsearch-dom';

export const SearchPagination = styled(Pagination)`
	&.ais-Pagination--noRefinement {
		display: none; 
	}

	ul {
		display: flex;
		flex-direction: row;
		list-style-type: none;
	}

	li a,
	li span {
		width: 2rem;
		height: 2rem;
		display: flex;
		padding: .5rem;
		margin: 0 .25rem;
		border-radius: 1rem;
		align-items: center;
    align-content: center;
		flex-direction: column;
		justify-content: center;
	}

	.ais-Pagination-item a,
	.ais-Pagination-item span {
		border: 1px solid #bfbfbf91;
	}

	.ais-Pagination-item--selected a {
		color: white;
		background: black;
		border: 1px solid black;
	}

	.ais-Pagination-item--disabled span {
		color: #9f9f9f;
		border: transparent;
		background: #fafafa;
		cursor: not-allowed;
	}
`