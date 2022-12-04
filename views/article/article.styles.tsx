import styled from '@emotion/styled';

type TitleProps =  {
  charCount: number;
}

export const Title = styled.h1<TitleProps>`
  ${(props) => `
    font-size: ${props.charCount > 25 ? '3.5rem' : '5rem' };
    @media only screen and (max-width: 599px) {
      font-size: ${props.charCount > 25 ? '2.5rem' : '3.5rem' };
    }
  `}
`