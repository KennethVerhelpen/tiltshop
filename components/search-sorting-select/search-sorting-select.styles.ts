import styled from "@emotion/styled";
import { SortBy } from 'react-instantsearch-dom';

export const SearchSortingSelect = styled(SortBy)`
	display: flex;
	cursor: pointer;
	border-radius: 6px;
	position: relative;
	flex-direction: row;
	background: #efefef;

	&:after {
		top: 50%;
		z-index: 0;
		right: .5rem;
		font-size: 1.5rem;
		position: absolute;
		content: 'arrow_drop_down';
		transform: translateY(-50%);
		font-family: 'Material Icons Two Tone';
	}

	select {
		z-index: 1;
		border: none;
		outline: none;
		height: 2.5rem;
		cursor: pointer;
		text-overflow:'';
		appearance: none;
		position: relative;
    text-indent: 0.01px;
		padding: 0 2rem 0 1rem;
		background: transparent;

		&:hover {
			background-color: 
		}

		&::-ms-expand {
			display: none;
		}
	}
`