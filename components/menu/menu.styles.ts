import styled from '@emotion/styled';

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