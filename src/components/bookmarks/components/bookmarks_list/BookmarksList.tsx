import {useState} from 'react';
import {isEmpty} from 'lodash';
import {DropdownButton, Dropdown} from '@/components/bootstrap';

import {useAppDispatch, useAppSelector} from '@/hooks';
import {confirmAction} from '@/reducers/commonSlice';
import {setActivePage, setSortDirection, setSortBy} from '@/reducers/bookmarkSlice';

import bookmarkActions from '@/actions/bookmarkActions';

import SORT_BY from '@/constants/sortBy';

import config from '@/config';
import uiHelper from '@/helpers/uiHelper';

import ListAction from '@/components/common/ListAction';
import Pagination from '@/components/common/Pagination';
import AppIcon, {IconName} from '@/components/common/AppIcon';

import BookmarkItem from './components/bookmark_item/BookmarkItem';
import AddTag from './components/AddTag';
import SaveBookmark from './components/SaveBookmark';

import {colors} from '@/styles/shared';

import * as styled from './BookmarksList.styled';

const sortByOptions = [
  {key: SORT_BY.TITLE, text: 'Title'},
  {key: SORT_BY.LAST_EDIT_DATE, text: 'Last edit'},
  {key: SORT_BY.CREATION_DATE, text: 'Created date'}
];

interface Props {
  onLoadData: () => void;
  onLoadTags: () => void;
}

function BookmarksList({onLoadData, onLoadTags}: Props) {
  const dispatch = useAppDispatch();

  const tags = useAppSelector(state => state.tag.list);
  const total = useAppSelector(state => state.bookmark.total);
  const bookmarks = useAppSelector(state => state.bookmark.list);
  const searchQuery = useAppSelector(state => state.bookmark.searchQuery);

  const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [bookmarkToEdit, setBookmarkToEdit] = useState<Bookmark | null>(null);
  const [showAddTagModal, setShowAddTagModal] = useState<boolean>(false);

  function addBookmark() {
    setBookmarkToEdit({id: 0, title: '', url: '', tags: []});
  }

  function editSelectedBookmark() {
    if (selectedBookmarks.length !== 1) return;

    const bookmarksToEdit = bookmarks.filter(bookmark => {
      if (!bookmark.id) return false;
      return selectedBookmarks.indexOf(bookmark.id) !== -1;
    });

    if (!isEmpty(bookmarksToEdit)) {
      setBookmarkToEdit({...bookmarksToEdit[0]});
    }
  }

  function displayAddTagModal() {
    setShowAddTagModal(true);
  }

  function confirmDeleteBookmarks() {
    dispatch(
      confirmAction({
        title: 'Delete bookmarks',
        action: async () => {
          await deleteBookmarks();
        }
      })
    );
  }

  async function deleteBookmarks() {
    await dispatch(bookmarkActions.deleteMultipleBookmarks(selectedBookmarks));

    uiHelper.showMessage('Bookmarks were deleted');

    await onLoadData();

    setSelectedBookmarks([]);
    setAllSelected(false);
  }

  function selectAllBookmarks() {
    if (allSelected) {
      setSelectedBookmarks([]);
      setAllSelected(false);
      return;
    }

    const selected: number[] = [];

    bookmarks.forEach(bookmark => {
      if (bookmark.id) selected.push(bookmark.id);
    });

    setSelectedBookmarks(selected);
    setAllSelected(true);
  }

  function pageSelection(pageNumber: number) {
    dispatch(setActivePage(pageNumber));
  }

  function sortDirection() {
    dispatch(setSortDirection());
  }

  function editBookmark(bookmark: Bookmark) {
    setBookmarkToEdit({...bookmark});
  }

  function confirmDeleteBookmark(id: number) {
    dispatch(
      confirmAction({
        title: 'Delete bookmark',
        action: async () => {
          await deleteBookmark(id);
        }
      })
    );
  }

  async function deleteBookmark(id: number) {
    await dispatch(bookmarkActions.deleteBookmark(id));

    uiHelper.showMessage('Bookmark was deleted');

    await onLoadData();
  }

  function confirmRestoreBookmark(id: number) {
    dispatch(
      confirmAction({
        title: 'Restore bookmark',
        action: async () => {
          await restoreBookmark(id);
        }
      })
    );
  }

  async function restoreBookmark(id: number) {
    await dispatch(bookmarkActions.restoreBookmark(id));

    uiHelper.showMessage('Bookmark was restored');

    await onLoadData();
  }

  function selectBookmark(id: number) {
    const selected: number[] = [...selectedBookmarks];

    const index = selectedBookmarks.indexOf(id);

    if (index === -1) {
      selected.push(id);
    } else {
      selected.splice(index, 1);
    }

    setSelectedBookmarks(selected);
  }

  function sortByAction(key: string) {
    dispatch(setSortBy(key));
  }

  async function addTagForBookmarks(selectedTags: number[]) {
    await dispatch(bookmarkActions.addTagsForMultipleBookmarks(selectedBookmarks, selectedTags));

    uiHelper.showMessage('Tags were added');

    await onLoadData();

    cancelAddTag();
    setAllSelected(false);
    setSelectedBookmarks([]);
  }

  function cancelAddTag() {
    setShowAddTagModal(false);
  }

  async function saveBookmark() {
    if (!bookmarkToEdit) return;

    await dispatch(bookmarkActions.saveBookmark(bookmarkToEdit));

    uiHelper.showMessage('Bookmark was saved');

    await onLoadData();

    cancelEditBookmark();
  }

  function cancelEditBookmark() {
    setBookmarkToEdit(null);
  }

  function updateBookmarkState(field: string, value: any) {
    if (!bookmarkToEdit) return;

    if (field === 'tags') {
      const tagsField = tags.filter(t => value.indexOf(t.id) !== -1);
      value = tagsField;
    }

    setBookmarkToEdit({...bookmarkToEdit, [field]: value});
  }

  function renderAddBookmarkAction() {
    return <ListAction action={addBookmark} tooltip="Add new bookmark." icon="plus" color={colors.greenLight} />;
  }

  function renderTableHeader() {
    return (
      <styled.tableHeader>
        <styled.row>
          <styled.cell field="checkbox">
            <input type="checkbox" onChange={selectAllBookmarks} checked={allSelected} />
          </styled.cell>
          <styled.cell field="title">Title</styled.cell>
          <styled.cell field="url">Url</styled.cell>
          <styled.cell field="tags">Tags</styled.cell>
          <styled.cell field="tools" />
          <styled.cell field="info" />
        </styled.row>
      </styled.tableHeader>
    );
  }

  function render() {
    const anyBookmarks = !isEmpty(bookmarks);

    const pageNumber = Math.ceil(total / config.pageSize);
    const {activePage, sortAsc, sortBy} = searchQuery;

    const editBookmarkVisible = bookmarkToEdit ? true : false;

    const onlyOneSelected = selectedBookmarks.length !== 1;
    const noSelection = selectedBookmarks.length === 0;

    const icon: IconName = sortAsc ? 'arrowDown' : 'arrowUp';

    return (
      <styled.wrapper>
        {anyBookmarks ? (
          <>
            <styled.headerContainer>
              <div>
                {renderAddBookmarkAction()}

                <ListAction
                  action={editSelectedBookmark}
                  tooltip="Edit bookmark"
                  icon="edit"
                  disabled={onlyOneSelected}
                  color={colors.gold}
                />

                <ListAction
                  action={displayAddTagModal}
                  tooltip="Add tag for multiple bookmarks."
                  icon="tag"
                  disabled={noSelection}
                />

                <ListAction
                  action={confirmDeleteBookmarks}
                  tooltip="Delete multiple bookmarks."
                  icon="delete"
                  disabled={noSelection}
                  color={colors.red}
                />
              </div>

              <Pagination pageCount={pageNumber} activePage={activePage} onPageSelection={pageSelection} />

              <styled.sortOrderContainer>
                <DropdownButton size="sm" title="Sort By: " id="sort-by-dropdown">
                  {sortByOptions.map(item => {
                    return (
                      <Dropdown.Item key={item.key} onClick={() => sortByAction(item.key)} active={sortBy === item.key}>
                        {item.text}
                      </Dropdown.Item>
                    );
                  })}
                </DropdownButton>

                <styled.sortDirectionIconContainer onClick={sortDirection}>
                  <AppIcon icon={icon} />
                </styled.sortDirectionIconContainer>
              </styled.sortOrderContainer>
            </styled.headerContainer>

            {renderTableHeader()}

            <styled.tableBody>
              {bookmarks.map(bookmark => {
                return (
                  <BookmarkItem
                    key={bookmark.id}
                    bookmark={bookmark}
                    selectedBookmarks={selectedBookmarks}
                    editBookmarkAction={editBookmark}
                    deleteBookmarkAction={confirmDeleteBookmark}
                    restoreBookmarkAction={confirmRestoreBookmark}
                    selectBookmarkAction={selectBookmark}
                  />
                );
              })}
            </styled.tableBody>
          </>
        ) : (
          <>
            <styled.addBookmarkContainer>{renderAddBookmarkAction()}</styled.addBookmarkContainer>

            <styled.noBookmarks>No bookmarks.</styled.noBookmarks>
          </>
        )}

        {editBookmarkVisible && (
          <SaveBookmark
            visible={editBookmarkVisible}
            bookmark={bookmarkToEdit}
            save={saveBookmark}
            close={cancelEditBookmark}
            onChange={updateBookmarkState}
            onLoad={onLoadTags}
          />
        )}

        {showAddTagModal && <AddTag visible={showAddTagModal} save={addTagForBookmarks} close={cancelAddTag} />}
      </styled.wrapper>
    );
  }

  return render();
}

export default BookmarksList;
