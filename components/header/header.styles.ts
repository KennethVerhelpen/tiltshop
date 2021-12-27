import styled from '@emotion/styled';
import { BREAKPOINTS } from '../../styles/design-system/variables';


export const Section = styled.header`
  z-index: 1;
`

export const LogoWrapper = styled.div`
  transform: translateY(.52rem);
  
  img {
    width: 5rem;
    height: 1.25rem;
  }
`

export const CustomTitle = styled.h1`
  letter-spacing: -1px;
  /* text-shadow: .5rem .5rem .5rem rgba(0,0,0,0.1); */
  font-size: 5rem;
  @media only screen and (max-width: ${BREAKPOINTS.sm}) {
    font-size: 3rem;
  }
`

export const DefaultTitle = styled.h1`
  letter-spacing: -1px;
  line-height: 1;
  /* text-shadow: .5rem .5rem .5rem rgba(0,0,0,0.1); */
  font-size: 6rem;
  @media only screen and (min-width: ${BREAKPOINTS.sm}) and (max-width: ${BREAKPOINTS.md}) {
    font-size: 4.5rem;
  }
  @media only screen and (max-width: ${BREAKPOINTS.sm}) {
    font-size: 3rem;
  }
`