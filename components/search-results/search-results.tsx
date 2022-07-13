import * as S from "./search-results.styles";

export type Props =  {
  hitComponent: (props: unknown) => void;
  hitsPerPage?: number;
}

export const SearchResults = (props: Props) => {
  const { hitComponent, hitsPerPage } = { ...props };

  return(
    <S.SearchResults hitComponent={hitComponent} hitsPerPage={hitsPerPage}/>
  )
}