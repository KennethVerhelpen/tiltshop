import * as S from './search-sorting-select.styles';
import { SortingItemType } from '../../lib/types';

export type SearchSortingSelectProps = {
  defaultItem: string;
  items: SortingItemType[];
}

export const SearchSortingSelect = (props: SearchSortingSelectProps) => {
  const { defaultItem, items } = { ...props }

	return (
    <S.SearchSortingSelect
      defaultRefinement={defaultItem}
      items={items}
    />
  )
}; 