import styled from "@emotion/styled";
import { Hits } from 'react-instantsearch-dom';

export const SearchResults = styled(Hits)`
	padding: 0;
	display: flex;
	flex-direction: column;

	.ais-Hits-list {
		list-style-type: none;
		flex-direction: row;
		margin-left: auto;
    margin-right: auto;
    padding: 0;
		width: 100%;
    max-width: 66rem;
		align-items: center;
    align-content: center;
		justify-content: center;
		display: flex;
		flex-wrap: wrap;
	}
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`