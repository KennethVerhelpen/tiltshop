import styled from "@emotion/styled";
import { Hits } from 'react-instantsearch-dom';

export const SearchResults = styled(Hits)`
	padding: 0;
	display: flex;
	flex-direction: column;

	.ais-Hits-list {
		margin: 0;
		list-style-type: none;
		flex-direction: row;
		margin-left: auto;
    margin-right: auto;
    padding: 0;
		width: 100%;
		align-items: flex-start;
    align-content: flex-start;
		justify-content: flex-start;
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;

		.ais-Hits-item {
			padding: 0.5rem;
			flex: 1 1 100%;
			max-width: 33.33%;
			max-height: 100%;
			@media only screen and (min-width: 600px) and (max-width: 960px) {
				max-width: 50%;
			}
			@media only screen and (max-width: 600px) {
				max-width: 100%;
			}
		}
	}
`