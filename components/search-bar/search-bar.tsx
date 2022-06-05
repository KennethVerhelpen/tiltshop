import clsx from 'clsx';
import { SearchBox } from 'react-instantsearch-dom';

import { SearchTwoTone } from '@mui/icons-material';

import * as S from './search-bar.styles';

export type SearchBarProps = {
  className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const { className } = { ...props };

	return (
    <S.SearchBar className={clsx(className, 'pl-16 pr-8 py-8 layout-row layout-align-center-center border border-content-900 shadow-2 bg-primary-100 width-100 mb-64')}>
        <div className={'layout-column layout-align-center-center bg-primary-200 rounded p-8 mr-16'}>
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