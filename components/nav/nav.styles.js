import styled from '@emotion/styled';

export const Shape = styled.nav`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  position: fixed;
  min-height: 3.25rem;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(20px);
`

export const Logo = styled.a`
  color: white;
`

export const SearchButton = styled.button`
  color: white;
  background: transparent;
`

export const NavButton = styled.a`
  padding: 0;
  height: 100%;
  border: none;
  outline: none;
  min-width: 6rem;
  color: rgba(255,255,255,0.5);
  background: transparent;

  &:after {
    width: 100%;
    height: 2px;
    content: '';
    display: block;
    border-radius: 2px;
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