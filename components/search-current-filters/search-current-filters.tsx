import * as S from "./search-current-filters.styles";
import clsx from "clsx";

export type Props = {
  className?: string;
}

export const SearchCurrentFilters = (props: Props) => {
  const { className } = { ...props }
	return (
    <div className={clsx(className)}>
      <S.SearchCurrentFilters/>
    </div>
  )
}