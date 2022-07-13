import styled from '@emotion/styled';

export const Shape = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }

    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
  animation-name: slideInUp;
  animation-duration: 0.5s;
  animation-fill-mode: both;
`

export const Header = styled.div`
  min-height: 2.875rem
`