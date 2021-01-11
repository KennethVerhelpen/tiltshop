import styled from '@emotion/styled';

export const ImageWrapper = styled.div`
  opacity: 1;
  top: 0;
  z-index: 0;
  transition: all .6s ease-in-out;

  img {
    overflow: hidden;
    border-radius: 1rem;
  }
`

export const Main = styled.main`
  z-index: 2;
  transition: all .4s ease-in-out;
`

export const Footer = Main.withComponent('footer')

export const IconButton = styled.div`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(3px);
`

export const Soon = styled.span`
  opacity: 0.5;
  background: rgba(255,255,255, 0.15);
`

export const Shape = styled.div`
  height: 30rem;
  max-width: 20rem;
  min-width: 20rem;
  box-shadow: 6px 6px 20px 0 rgba(0, 0, 0, 0.35),
  20px 20px 8px 0 rgba(0, 0, 0, 0.08),
  5px 5px 7px 0 rgba(0, 0, 0, 0.09);

  &:hover {
    .image:last-child {
      opacity: 0;
      transition: all .3s ease-in-out;
    }

    .content {
      margin-bottom: 2rem;
      transition: all .3s ease-in-out;
    }
  }
`

export const Title = styled.div`
  z-index: 3;
  letter-spacing: -0.5px;
  line-height: 2.375rem;
  letter-spacing: -0.7px;
  transition: text-shadow .2s ease-in-out;

  @media only screen and (max-width: 599px) {
    font-size: 2.5rem;
  }
`