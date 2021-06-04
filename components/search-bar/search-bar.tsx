import * as S from './search-bar.styles';
import { SearchBox } from 'react-instantsearch-dom';
import { SearchTwoTone } from '@material-ui/icons';

import clsx from "clsx";

export type SearchBarProps = {
  className?: string;
}

export const SearchBar = (props: SearchBarProps) => {
  const { className } = { ...props };

	return (
    <S.SearchBar className={clsx(className, "pl-16 pr-8 py-8 layout-row layout-align-center-center border border-content-900 shadow-2 bg-secondary-100 width-100 mb-64")}>
        <div className="layout-column layout-align-center-center bg-secondary-200 rounded p-8 mr-16">
          <SearchTwoTone className="text-secondary-400" style={{ fontSize: 18 }}/>
        </div>
        <SearchBox
          className="flex layout-row"
          translations={{
            placeholder: 'eg. Harry Potter, Stranger Things, Headphones...'
          }}
        />
    </S.SearchBar>
  )
};