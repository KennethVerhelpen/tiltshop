import styled from '@emotion/styled';


export const Section = styled.header`
  padding: 12rem 0 6rem 0;
  z-index: 1;

  h1 {
    font-size: 4rem;
    color: black;
    font-weight: 800;
    letter-spacing: -1px;
    text-shadow: 10px 10px 10px rgba(0,0,0,0.1);
  }

  @media only screen and (max-width: 599px) {
    height: 100vh;
    padding: 1rem 0;
  }
`

export const LogoWrapper = styled.div`
  transform: translateY(.52rem);
`