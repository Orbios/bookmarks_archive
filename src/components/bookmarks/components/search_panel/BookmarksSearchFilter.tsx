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
  const [includeNestedTags, setIncludeNestedTags] = useState<boolean>(false);

  function handleSearch() {
    dispatch(setSearchParams({searchStr, searchMode, searchTags: selectedTags, includeNestedTags}));
  }

  function handleClear() {
    setSearchStr('');
    setSearchMode(SEARCH_MODE.ALL);
    setSelectedTags([]);
    setIncludeNestedTags(false);

    dispatch(setSearchParams({searchStr: '', searchMode: SEARCH_MODE.ALL, searchTags: []}));
  }

  function toggleSearchMode(id: string) {
    const searchModes = [SEARCH_MODE.ALL, SEARCH_MODE.NO_TAGS, SEARCH_MODE.DELETED, SEARCH_MODE.TAG_SELECTION];

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

  function toggleCheckbox() {
    setIncludeNestedTags(val => !val);
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
        title="All bookmarks"
        id={SEARCH_MODE.ALL}
        searchMode={searchMode}
        onToggle={toggleSearchMode}>
        Search for all bookmarks.
      </BookmarkSearchMode>

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

        <label>
          <input
            type="checkbox"
            id={`${SEARCH_MODE.TAG_SELECTION}-checkbox`}
            checked={includeNestedTags}
            onChange={toggleCheckbox}
          />{' '}
          Include nested tags
        </label>
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
