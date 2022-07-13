import styled from '@emotion/styled';

export const Shape = styled.nav`
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  position: sticky;

  > div:last-of-type {
    min-height: 2.125rem;
  }

  > div:first-of-type {
    min-height: 2.875rem;
  }
`

export const Logo = styled.img`
  width: 2rem;
  height: 2.75rem;
  object-fit: contain;
`