import styled from '@emotion/styled';
import { CurrentRefinements } from 'react-instantsearch-dom';

export const SearchCurrentFilters = styled(CurrentRefinements)`
	ul {
		margin: 0;
		padding: 0;
		list-style-type: none;

		.ais-CurrentRefinements-item {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
		}

		.ais-CurrentRefinements-category {
			border-radius: 2rem;
			background: black;
			color: white;
			border: none;
			margin-bottom: .25rem;
			padding: .5rem .5rem .5rem 1rem;

			button {
				border: none;
				background: none;
			}

			&:not(:last-child) {
				margin-right: .5rem;
			}

		}
	}
	.ais-CurrentRefinements-label {
		display:none;
	}
`