import {useState} from 'react';
import {Button} from '@/components/bootstrap';

import {useAppSelector, useAppDispatch} from '@/hooks';

import {setSearchParams} from '@/reducers/bookmarkSlice';

import SEARCH_MODE from '@/constants/searchMode';

import TagSelector from '@/components/common/TagSelector';
import BookmarkSearchMode from './BookmarkSearchMode';
import SearchTitle from './components/SearchTitle';

import * as styled from './BookmarksSearchFilter.styled';

function BookmarksSearchFilter() {
  const dispatch = useAppDispatch();

  const total = useAppSelector(state => state.bookmark.total);
  const searchQuery = useAppSelector(state => state.bookmark.searchQuery);

  const tagsOptions = useAppSelector(state => state.tag.options);

  const [searchStr, setSearchStr] = useState<string>(searchQuery.searchStr);
  const [searchMode, setSearchMode] = useState<string>(searchQuery.searchMode);
  const [selectedTags, setSelectedTags] = useState<TagOption[]>(searchQuery.searchTags);

  function handleSearch() {
    dispatch(setSearchParams({searchStr, searchMode, searchTags: selectedTags}));
  }

  function handleClear() {
    setSearchStr('');
    setSearchMode('');
    setSelectedTags([]);

    dispatch(setSearchParams({searchStr: '', searchMode: '', searchTags: []}));
  }

  function toggleSearchMode(id: string) {
    const searchModes = [SEARCH_MODE.NO_TAGS, SEARCH_MODE.DELETED, SEARCH_MODE.TAG_SELECTION];

    if (searchModes.includes(id)) {
      setSearchMode(id);
    }
  }

  function updateState(value: number[]) {
    const selected = tagsOptions.filter(tagOption => {
      return value.indexOf(tagOption.value) !== -1;
    });

    setSelectedTags(selected);
  }

  return (
    <div>
      <SearchTitle title="Search" />

      <styled.sectionTitle>Filter:</styled.sectionTitle>
      <input
        type="text"
        value={searchStr}
        className="form-control"
        onChange={e => setSearchStr(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') handleSearch();
        }}
      />

      <styled.sectionTitle>Mode:</styled.sectionTitle>

      <BookmarkSearchMode
        title="New bookmarks (no tags)"
        id={SEARCH_MODE.NO_TAGS}
        searchMode={searchMode}
        onToggle={toggleSearchMode}>
        Search for bookmarks with no tags. Useful when sorting newly imported bookmarks.
      </BookmarkSearchMode>

      <BookmarkSearchMode
        title="Tags selection"
        id={SEARCH_MODE.TAG_SELECTION}
        searchMode={searchMode}
        onToggle={toggleSearchMode}>
        <TagSelector
          label="Select tags:"
          multi={true}
          options={tagsOptions}
          value={selectedTags}
          onChange={updateState}
        />
      </BookmarkSearchMode>

      <BookmarkSearchMode
        title="Deleted bookmarks"
        id={SEARCH_MODE.DELETED}
        searchMode={searchMode}
        onToggle={toggleSearchMode}>
        Search for deleted bookmarks.
      </BookmarkSearchMode>

      <styled.resultsRow>
        Results found: <strong>{total}</strong>
      </styled.resultsRow>

      <styled.searchActionContainer>
        <styled.searchButton onClick={handleSearch}>Search</styled.searchButton>

        <Button variant="light" onClick={handleClear}>
          Clear
        </Button>
      </styled.searchActionContainer>
    </div>
  );
}

export default BookmarksSearchFilter;
