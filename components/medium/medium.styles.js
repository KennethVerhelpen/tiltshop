import styled from '@emotion/styled';

export const ImageWrapper = styled.div`
  opacity: 1;
  transition: all .6s ease-in-out;
  img {
    overflow: hidden;
    border-radius: 16px;
  }
`

export const Content = styled.div`
  z-index: 2;
  transition: all .4s ease-in-out;

  span {
    color: white;
  }
`

export const Shape = styled.div`
  height: 30rem;
  max-width: 20rem;
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
  color: white;
  letter-spacing: -0.5px;
  line-height: 2.375rem;
  letter-spacing: -0.7px;
  transition: text-shadow .2s ease-in-out;

  @media only screen and (max-width: 599px) {
    font-size: 3rem;
  }
`