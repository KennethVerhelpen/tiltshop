import styled from '@emotion/styled';

import { BREAKPOINTS } from '../../styles/design-system/variables';
import { GridWidthType, HeaderWrapperType, HeaderContentType } from './home.view';

const outsetSpace = '22rem';

export const Fading = styled.div`
  position: relative;

  &:before, &::after {
    content: '';
    left: 0;
    width: 100%;
    height: 15rem;
    z-index: 2;
    position: fixed;
    pointer-events: none;
  }

  &:before {
    top: 0;
    background:
      linear-gradient(
        180deg,
        #000000 0%,
        rgba(0, 0, 0, 0) 100%
      );
  }

  &:after {
    bottom: 0;
    background:
      linear-gradient(
        0deg,
        #000000 0%,
        rgba(0, 0, 0, 0) 100%
      );
  }

  @media only screen and (min-width: ${BREAKPOINTS.xs}) {
    margin-top: ${`-${outsetSpace}`};
  }
  
  @media only screen and (max-width: ${BREAKPOINTS.xs}) {
    &:before, &::after {
      display: none;
    }
  }
`

export const MiddleGrid = styled.div<GridWidthType>`
  max-width: ${(props) => `${props.width ? `${props.width}rem` : 'none'}`};
  min-width: ${(props) => `${props.width ? `${props.width}rem` : 'auto'}`};
`

export const HeaderWrapper = styled.div<HeaderWrapperType>`
  max-width: ${(props) => `${props.width ? `${props.width}rem` : 'none'}`};
  min-width: ${(props) => `${props.width ? `${props.width}rem` : 'auto'}`};
  min-height: 31rem;

  @media only screen and (max-width: ${BREAKPOINTS.xs}) {
    min-height: auto;
  }
`

export const HeaderContent = styled.div<HeaderContentType>`
  transition: all 0.3 ease-in-out;
  opacity: ${(props) => `${props.opacity}`};
  transform: ${(props) => `translateY(-${props.position}px)`};
`
