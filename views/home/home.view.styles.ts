import styled from '@emotion/styled';
import { GridWidthType, HeaderWrapperType, HeaderContentType } from './home.view';

const outsetSpace = '22rem';

export const Fading = styled.div`
  position: relative;
  margin-top: ${`-${outsetSpace}`};

  &:before, &::after {
    content: '';
    left: 0;
    width: 100%;
    height: 15rem;
    z-index: 1;
    position: absolute;
    pointer-events: none;
  }

  &:before {
    top: ${outsetSpace};
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
`

export const MiddleGrid = styled.div<GridWidthType>`
  max-width: ${(props) => `${props.width}rem`};
  min-width: ${(props) => `${props.width}rem`};
`

export const HeaderWrapper = styled.div<HeaderWrapperType>`
  max-width: ${(props) => `${props.width}rem`};
  min-width: ${(props) => `${props.width}rem`};
  min-height: 31rem;
`

export const HeaderContent = styled.div<HeaderContentType>`
  transition: all 0.3 ease-in-out;
  opacity: ${(props) => `${props.opacity}`};
  transform: ${(props) => `translateY(-${props.position}px)`};
`
