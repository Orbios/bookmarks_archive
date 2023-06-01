import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import cacheHelper from '@/services/cacheHelper';

import {tagField} from '@/components/tags/TagsPage.styled';

interface SortOrder {
  sortBy: tagField;
  sortAsc: boolean;
}

interface TagState {
  list: Tag[];
  options: TagOption[];
  sortOrder: SortOrder;
}

const initialState: TagState = {
  list: [],
  options: [],
  sortOrder: {
    sortBy: 'title',
    sortAsc: true
  }
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    loadTags: (state, action: PayloadAction<Tag[]>) => {
      state.list = sortTags(action.payload, state.sortOrder.sortBy, state.sortOrder.sortAsc);
      state.options = action.payload.map(tag => ({
        value: tag.id,
        label: tag.title
      }));
    },
    setSortOrder: (state, action: PayloadAction<SortOrder>) => {
      const {sortBy, sortAsc} = action.payload;

      state.sortOrder.sortBy = sortBy;
      state.sortOrder.sortAsc = sortAsc;
      state.list = sortTags(state.list, sortBy, sortAsc);
    }
  }
});

function sortTags(list, sortBy, sortAsc) {
  return cacheHelper.sortList(list, sortBy, sortAsc, [
    {name: 'title', type: 'string'},
    {name: 'bookmarkCount', type: 'number'},
    {name: 'description', type: 'string'}
  ]);
}

export const {loadTags, setSortOrder} = tagSlice.actions;

export default tagSlice.reducer;
