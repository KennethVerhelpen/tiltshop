import clsx from 'clsx';
import { SearchBox } from 'react-instantsearch-dom';

import { SearchTwoTone } from '@mui/icons-material';

import { ThemeType } from '../../lib/types';
import * as S from './search-bar.styles';

export type SearchBarProps = {
  className?: string;
  theme: ThemeType;
}

export const SearchBar = (props: SearchBarProps) => {
  const { className, theme } = { ...props };

	return (
    <S.SearchBar theme={theme} className={clsx(className, theme === 'dark' ? 'bg-neutral-100' : 'bg-primary-900', 'pl-16 pr-8 py-8 layout-row layout-align-center-center shadow-2 bg-primary-100 width-100 mb-64')}>
        <div className={'layout-column layout-align-center-center mr-12'}>
          <SearchTwoTone className={'text-primary-400'} style={{ fontSize: 18 }}/>
        </div>
        <SearchBox
          className={'flex layout-row'}
          translations={{
            placeholder: 'eg. Harry Potter, Stranger Things, Headphones...'
          }}
        />
    </S.SearchBar>
  )
};