import styled from '@emotion/styled';

export const BackgroundWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  margin: auto;
  height: 48rem;
  max-width: 90rem;
`

export const Main = styled.main`
  z-index: 1;
  padding-top: 5rem;

  &.dark {
    background-color: black;
  }
`
