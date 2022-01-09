import styled from '@emotion/styled';
import { COLORS } from '../../styles/design-system/variables';

export const Grid = styled.main`
	@media only screen and (max-width: 959px) and (max-width: 959px) {
		max-width: 44rem; 
	}
`

export const ArticleShape = styled.div`
  height: 20rem;
  background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 100%);
`

export const Description = styled.div`
  p {
    line-height: 1.5;
    font-size: 1.125rem;
  }
  b {
    color: ${COLORS.PRIMARY_300};
  }
`

export const Placeholder = styled.div`
  margin-top: -10rem;
`