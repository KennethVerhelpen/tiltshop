import styled from '@emotion/styled';

export const Shape = styled.nav`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(1.25rem);
  > div:last-of-type {
    min-height: 2.125rem;
  }
  > div:first-of-type {
    min-height: 2.875rem;
  }
`

export const NavButton = styled.a`
  padding: 0;
  height: 100%;
  min-width: 6rem;
  box-shadow: 0 0.125rem 0.625rem 0 rgba(0,0,0,0.25);

  &:after {
    width: 100%;
    height: 0.125rem;
    content: '';
    display: block;
    border-radius: 0.125rem;
    transform: scaleX(0);
    transform-origin: center;
    background-color: white;
    transition: all .15s ease-in-out;
  }

  &:hover,
  &.active {
    color: white;
    &:after {
      transform: scaleX(1);
      transition: all .15s ease-in-out;
    }
  }
`