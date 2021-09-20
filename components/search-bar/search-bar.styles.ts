import styled from '@emotion/styled';

export const SearchBar = styled.div`
	min-height: 3rem;
	max-width: 32rem;
	border-radius: 0.75rem;

	form {
		flex: 1 1;
		display: flex;
    flex-direction: row;
	}

	input {
		border: none;
		outline: none;
		display: flex;
		flex: 1 1 100%;
	}

	.ais-SearchBox-submit {
		border: none;
		flex:1;
  	order: 1;
		border-radius: 0.375rem;
		line-height: 1.5rem;
		background: #000000;
		padding: 0.5rem 1rem;
		box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.16), 0px 4px 8px rgba(0, 0, 0, 0.18);

		&::after {
			content: 'Search';
			color: white;
		}

		svg {
			display: none;
		}
	}

	.ais-SearchBox-reset {
		flex:1;
		order: 0;
		border: none;
		background: none;
		margin: 0 .5rem;
	}
`