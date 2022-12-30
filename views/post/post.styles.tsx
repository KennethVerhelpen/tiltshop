import styled from '@emotion/styled';
import { Star } from '@mui/icons-material';

import { BREAKPOINTS, COLORS, RADIUSES, TYPOGRAPHY } from '../../styles/design-system/variables';
import { Article as ImportedArticle } from '../../components';

export const Title = styled.h1`
  font-size: 4.5rem;

  @media only screen and (min-width: ${BREAKPOINTS.xs}) and (max-width: ${BREAKPOINTS.md}) {
   font-size: 3.5rem;
  }

  @media only screen and (max-width: ${BREAKPOINTS.xs}) {
   font-size: 2.5rem;
  }
`

export const AvatarImageWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
`

export const SideBlock = styled.div`
  top: 6rem;
  min-width: 15rem;
  max-width: 15rem;
`

export const PostContent = styled.div`
  > p {
    line-height: ${TYPOGRAPHY.LINE_HEIGHT_2};
    font-size: ${TYPOGRAPHY.H6};
  }
`

export const Article = styled(ImportedArticle)`
  top: 6rem;
`

export const CoverImageWrapper = styled.div`
  height: 24rem;

  @media only screen and (min-width: ${BREAKPOINTS.xs}) {
   border-radius: ${RADIUSES.xl}; 
  }
`

export const IndexButton = styled.button`
  color: ${COLORS.PRIMARY_500};

  &:hover {
    color: ${COLORS.PRIMARY_900};
  }
`

export const StarRating = styled(Star)`
  color: ${COLORS.STAR};
`

