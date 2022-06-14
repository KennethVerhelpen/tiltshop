import styled from '@emotion/styled';
import { COLORS } from '../../styles/design-system/variables';

export const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

export const Input = styled.input`
	min-height: 3rem;
	outline: none;
	&::placeholder {
		color: ${COLORS.PRIMARY_700};
	}
`

export const Form = styled.form`
	min-width: 30rem;
`