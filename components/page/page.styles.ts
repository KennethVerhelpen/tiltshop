import styled from '@emotion/styled';

export type MainProps = {
  menu: boolean;
  nav: boolean;
}

export const BackgroundWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
  margin: auto;
  height: 48rem;
  max-width: 90rem;
`

export const Main = styled.main<MainProps>`
  z-index: 1;

  /* TODO: move this to the direct child */
  padding-top: ${(props) => `${props.menu && props.nav ? '5rem' : 0 }`};


  &.dark {
    background-color: black;
  }
`
