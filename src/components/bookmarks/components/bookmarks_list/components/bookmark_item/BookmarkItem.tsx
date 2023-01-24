import {Button} from '@/components/bootstrap';

import formatHelper from '@/helpers/formatHelper';

import AppIcon from '@/components/common/AppIcon';
import Tooltip from '@/components/common/Tooltip';
import BookmarkTooltip from './components/BookmarkTooltip';
import TagsTooltip from './components/TagsTooltip';

const {shell} = require('electron');

import {colors} from '@/styles/shared';

import * as styled from './BookmarkItem.styled';
import * as styledCommon from '../../BookmarksList.styled';

interface Props {
  bookmark: Bookmark;
  selectedBookmarks: number[];
  editBookmarkAction: (bookmark: Bookmark) => void;
  deleteBookmarkAction: (id: number) => void;
  restoreBookmarkAction: (id: number) => void;
  selectBookmarkAction: (id: number) => void;
}

function BookmarkItem({
  bookmark,
  selectedBookmarks,
  editBookmarkAction,
  deleteBookmarkAction,
  restoreBookmarkAction,
  selectBookmarkAction
}: Props) {
  function isChecked() {
    let isChecked = false;

    for (const id of selectedBookmarks) {
      if (bookmark.id === id) {
        isChecked = true;
      }
    }

    return isChecked;
  }

  function handleChange() {
    if (!bookmark.id) return;
    selectBookmarkAction(bookmark.id);
  }

  function editClick() {
    editBookmarkAction(bookmark);
  }

  function restoreClick() {
    if (!bookmark.id) return;
    restoreBookmarkAction(bookmark.id);
  }

  function deleteClick() {
    if (!bookmark.id) return;
    deleteBookmarkAction(bookmark.id);
  }

  function openLink() {
    shell.openExternal(bookmark.url);
  }

  function render() {
    if (!bookmark.id) return null;

    const bookmarkId = bookmark.id.toString();

    const shortenedUrl = formatHelper.truncateUrl(bookmark.url);

    return (
      <styledCommon.row>
        <styledCommon.cell field="checkbox">
          <input type="checkbox" id={bookmarkId} value={bookmark.id} checked={isChecked()} onChange={handleChange} />
        </styledCommon.cell>

        <styledCommon.cell field="title">
          <BookmarkTooltip id={`title-tooltip-${bookmarkId}`} bookmark={bookmark}>
            <label htmlFor={bookmarkId}>{bookmark.title}</label>
          </BookmarkTooltip>
        </styledCommon.cell>

        <styledCommon.cell field="url">
          <Tooltip id={`url-tooltip-${bookmarkId}`} title={bookmark.url}>
            <Button variant="link" onClick={openLink}>
              {shortenedUrl}
            </Button>
          </Tooltip>
        </styledCommon.cell>

        <styledCommon.cell field="tags">
          {bookmark.isTagged ? (
            <TagsTooltip id={`tags-tooltip-${bookmarkId}`} tags={bookmark.tags}>
              <span>
                <AppIcon icon="search" flip="horizontal" />
              </span>
            </TagsTooltip>
          ) : (
            <Tooltip id={`no-tags-${bookmarkId}`} title="No tags for this bookmark.">
              <span>
                <AppIcon icon="minus" />
              </span>
            </Tooltip>
          )}
        </styledCommon.cell>

        <styledCommon.cell field="tools">
          <styled.actionIconsListContainer>
            <Tooltip id={`edit-bookmark-tooltip-${bookmarkId}`} title="Edit bookmark">
              <Button variant="link" onClick={editClick}>
                <AppIcon icon="edit" color={colors.gold} />
              </Button>
            </Tooltip>

            {bookmark.isDeleted ? (
              <Tooltip id={`restore-bookmark-tooltip-${bookmarkId}`} title="Restore bookmark">
                <Button variant="link" onClick={restoreClick}>
                  <AppIcon icon="undo" />
                </Button>
              </Tooltip>
            ) : (
              <Tooltip id={`delete-bookmark-tooltip-${bookmarkId}`} title="Delete bookmark">
                <Button variant="link" onClick={deleteClick}>
                  <AppIcon icon="delete" color={colors.red} />
                </Button>
              </Tooltip>
            )}

            <BookmarkTooltip id={`info-tooltip-${bookmarkId}`} bookmark={bookmark}>
              <styled.tooltipWrapper>
                <AppIcon icon="exclamation" color={colors.green} />
              </styled.tooltipWrapper>
            </BookmarkTooltip>
          </styled.actionIconsListContainer>
        </styledCommon.cell>
      </styledCommon.row>
    );
  }

  return render();
}

export default BookmarkItem;
