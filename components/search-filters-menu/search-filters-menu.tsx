import React, { useState } from 'react';
import { FilterListTwoTone } from '@mui/icons-material';
import { Global, css } from '@emotion/react';

import { RefinementList } from 'react-instantsearch-dom';

import * as S from './search-filters-menu.styles';

export const SearchFiltersMenu = React.forwardRef((props, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

	return (
    <>
    	<Global
				styles={
        css`
          .MuiMenu-paper {
            border-radius: .375rem !important;
            box-shadow: 0 0 30px 0 rgba(144, 144, 144, 0.12), 0 0 16px rgba(144, 144, 144, 0.15) !important;
          }
        `}
			/>
      <button
        aria-haspopup={'true'}
        aria-controls={'type-filter-menu'}
        className={'btn btn-sm btn-primary layout-row layout-align-start-center m-4'}
        onClick={handleClick}>
        <FilterListTwoTone style={{ fontSize: 16 }} className={'mr-8'}/>
        <span>Filters</span>
      </button>
      <S.SearchFiltersMenu
        ref={ref}
        id={'type-filter-menu'}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <RefinementList
          limit={20}
          attribute={'topicName'}
        />
      </S.SearchFiltersMenu>
    </>
  )
});