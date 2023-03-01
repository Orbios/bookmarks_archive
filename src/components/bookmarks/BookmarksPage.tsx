import {useEffect, useState} from 'react';
import styled from 'styled-components';

import {useAppDispatch, useAppSelector} from '@/hooks';
import {setSearchMode} from '@/reducers/bookmarkSlice';

import statisticsActions from '@/actions/statisticsActions';
import bookmarkActions from '@/actions/bookmarkActions';
import tagActions from '@/actions/tagActions';

import SEARCH_MODE from '@/constants/searchMode';

import BookmarkStatistics from './components/search_panel/BookmarkStatistics';
import BookmarksSearchFilter from './components/search_panel/BookmarksSearchFilter';
import BookmarksList from './components/bookmarks_list/BookmarksList';

import {searchPanelWidth, colors} from '@/styles/shared';

const SearchPanel = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${searchPanelWidth};
  color: #ab9ba9;
  background-color: #4c394b;
  border-right: 1px solid ${colors.gray};
  padding: 20px 15px 0;
`;

function BookmarksPage() {
  const dispatch = useAppDispatch();

  const {sortAsc, activePage, sortBy, searchStr, searchMode, searchTags} = useAppSelector(
    state => state.bookmark.searchQuery
  );

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (isInitialLoad) return;

    loadData();
  }, [sortAsc, activePage, sortBy, searchStr, searchMode, searchTags]);

  async function loadData() {
    await loadTags();

    const bookmarksCount = await dispatch(bookmarkActions.loadBookmarks());

    //if no new items, search for all instead
    if (bookmarksCount === 0 && isInitialLoad) {
      await dispatch(setSearchMode(SEARCH_MODE.ALL));
      return;
    }

    setIsInitialLoad(false);

    await loadStatistic();
  }

  async function loadTags() {
    await dispatch(tagActions.loadTags());
  }

  async function loadStatistic() {
    await dispatch(statisticsActions.loadStatistics());
  }

  return (
    <div>
      <SearchPanel>
        <BookmarkStatistics />

        <BookmarksSearchFilter />
      </SearchPanel>

      <BookmarksList onLoadData={loadData} onLoadTags={loadTags} />
    </div>
  );
}

export default BookmarksPage;
