import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import SORT_BY from '@/constants/sortBy';
import SEARCH_MODE from '@/constants/searchMode';

import config from '@/config';

interface SearchQuery {
  activePage: number;
  sortBy: string;
  sortAsc: boolean;
  searchStr: string;
  searchMode: string;
  searchTags: TagOption[];
}

interface BookmarkState {
  list: Bookmark[];
  total: number;
  searchQuery: SearchQuery;
}

const initialState: BookmarkState = {
  list: [],
  total: 0,
  searchQuery: {
    activePage: 1,
    sortBy: SORT_BY.TITLE,
    sortAsc: true,
    searchStr: '',
    searchMode: SEARCH_MODE.NO_TAGS,
    searchTags: []
  }
};

export const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    loadBookmarks: (state, action: PayloadAction<{total: number; bookmarks: Bookmark[]}>) => {
      state.list = action.payload.bookmarks;
      state.total = action.payload.total;
      updateActivePage(state, action.payload.total);
    },
    setSearchMode: (state, action: PayloadAction<string>) => {
      state.searchQuery.searchMode = action.payload;
    },
    setSortDirection: state => {
      state.searchQuery.sortAsc = !state.searchQuery.sortAsc;
      state.searchQuery.activePage = 1;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.searchQuery.activePage = action.payload;
    },
    setSortBy: (state, action: PayloadAction<string>) => {
      state.searchQuery.sortBy = action.payload;
      state.searchQuery.activePage = 1;
    },
    setSearchParams: (
      state,
      action: PayloadAction<{searchStr: string; searchMode: string; searchTags: TagOption[]}>
    ) => {
      state.searchQuery.searchStr = action.payload.searchStr;
      state.searchQuery.searchMode = action.payload.searchMode;
      state.searchQuery.searchTags = action.payload.searchTags;
      state.searchQuery.activePage = 1;
    }
  }
});

function updateActivePage(state, total) {
  const activePage = state.searchQuery.activePage;
  const pageNumber = Math.ceil(total / config.pageSize);

  //when delete the last element on the last page or add first element
  if (activePage > pageNumber || (activePage === 0 && total === 1)) {
    state.searchQuery.activePage = pageNumber;
  }
}

export const {loadBookmarks, setSearchMode, setSortDirection, setActivePage, setSortBy, setSearchParams} =
  bookmarkSlice.actions;

export default bookmarkSlice.reducer;
