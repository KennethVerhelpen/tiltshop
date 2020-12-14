import styled from '@emotion/styled';


export const Section = styled.header`
  padding: 12rem 0 6rem 0;
  z-index: 1;

  @media only screen and (max-width: 599px) {
    height: 100vh;
  }
`

export const LogoWrapper = styled.div`
  transform: translateY(.52rem);
`

export const CustomTitle = styled.h1`
  letter-spacing: -1px;
  text-shadow: .5rem .5rem .5rem rgba(0,0,0,0.1);
  font-size: 5rem;
  @media only screen and (max-width: 599px) {
    font-size: 3rem;
  }
`

export const DefaultTitle = styled.h1`
  letter-spacing: -1px;
  text-shadow: .5rem .5rem .5rem rgba(0,0,0,0.1);
  font-size: 4rem;
  @media only screen and (max-width: 599px) {
    font-size: 2.5rem;
  }
`