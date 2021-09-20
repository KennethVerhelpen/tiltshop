import styled from '@emotion/styled';

export const ImageWrapper = styled.div`
  top: 0;
  z-index: 0;

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
  min-width: 20rem;

  .image-wrapper::before {
    top: 0;
    left: 0;
    z-index: 1;
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,0.1);
    transition: all .6s ease-in-out;
  }

  &:hover {
    .image-wrapper::before {
      background: rgba(0,0,0,0);
      transition: all .6s ease-in-out;
    }
    .content {
      margin-bottom: 2rem;
      transition: all .3s ease-in-out;
    }
  }
`

export const Title = styled.div`
  z-index: 3;
  opacity: 0.75;
  letter-spacing: -0.5px;
  line-height: 2.375rem;
  letter-spacing: -0.7px;

  @media only screen and (max-width: 599px) {
    font-size: 2.5rem;
  }
`