
import styled from '@emotion/styled';
import { Menu } from '@mui/icons-material';

export const SearchFiltersMenu = styled(Menu)`
	padding: 1rem 0;

	ul {
		padding: 0;
		list-style-type: none;
	}

	.ais-RefinementList-list {
		padding: .5rem 0;

		li {
			line-height: 2.5rem;
			cursor: pointer;
			flex-direction: row;
			display: flex;

			* {
				cursor: pointer;
			}

			input {
				display: none;
			}

			.ais-RefinementList-labelText {
				display: flex;
				align-items: center;
    		align-content: center;
				justify-content: start;
				flex-direction: row;
				flex: 1 1;
				padding-right: 1rem;
			}

			.ais-RefinementList-label {
				width: 100%;
				display: flex;
				flex-direction: row;
				align-items: center;
				align-content: center;
				justify-content: center;
				padding: 0 1rem;
			}

			.ais-RefinementList-labelText:before {
				margin-right: .5rem;
				font-family: 'Material Icons Two Tone';
			}

			&:not(.ais-RefinementList-item--selected) {

				&:hover {
					background: #fafafa;
				}

				.ais-RefinementList-labelText:before {
					content: 'check_box_outline_blank';
				}
			}

			&.ais-RefinementList-item--selected {

				.ais-RefinementList-labelText {
					font-weight: bold;

					&:before {
						content: 'check_box';
					}
				}
				.ais-RefinementList-count {
					background: black;
					color: white;
				}
			}

			.ais-RefinementList-count {
				border-radius: 1rem;
				color: black;
				background: #bfbfbf91;
				font-size: 0.875rem;
				line-height: 1;
				padding: 0.25rem 0.5rem;
			}
		}
	}

`