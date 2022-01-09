import styled from '@emotion/styled';

import { TYPOGRAPHY } from '../../styles/design-system/variables';
import { Article as ImportedArticle } from '../../components';

export const AuthorImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-width: 0.125rem;
`

export const SideBlock = styled.div`
  top: 6rem;
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

