import styled from '@emotion/styled';

export const Fading = styled.div`
  position: relative;

  &:before {
    content: '';
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    pointer-events: none;
    background:
      linear-gradient(
        270deg,
        #000000 0%,
        rgba(0, 0, 0, 0) 15%,
        rgba(0, 0, 0, 0) 85%,
        #000000 100%),
      linear-gradient(
        180deg,
        #000000 0%,
        rgba(0, 0, 0, 0) 10%,
        rgba(0, 0, 0, 0) 85%,
        #000000 100%
      );
  }
`
