import * as S from './search-current-filters.styles';
import clsx from 'clsx';
import { ThemeType } from '../../lib/types';

export type Props = {
  className?: string;
  theme?: ThemeType;
}

export const SearchCurrentFilters = (props: Props) => {
  const { className, theme } = { ...props }
	return (
    <div className={clsx(className)}>
      <S.SearchCurrentFilters theme={theme}/>
    </div>
  )
}