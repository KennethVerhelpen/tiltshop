
import styled from '@emotion/styled';
import { StarHalfTwoTone, Star, StarBorderTwoTone } from '@material-ui/icons';

export const ActiveStar = styled(Star)`
  color: #FFBB27;
`

export const ActiveStarHalf = styled(StarHalfTwoTone)`
  color: #FFBB27;
`

export const InactiveStar = styled(StarBorderTwoTone)`
  color: white;
  opacity: 0.5;
`

export const Shape = styled.article`
  height: 30rem;
  max-width: 20rem;
  box-shadow: 6px 6px 20px 0 rgba(0,0,0,0.35), 5px 5px 7px 0 rgba(0,0,0,0.09), 20px 20px 8px 0 rgba(0,0,0,0.08);
`

export const Main = styled.main`
  span {
    color: white;
  }
`

export const Footer = Main.withComponent('footer');

export const ImageWrapper = styled.div`
  z-index: -1;
  img {
    overflow: hidden;
    border-radius: 16px;
  }
`