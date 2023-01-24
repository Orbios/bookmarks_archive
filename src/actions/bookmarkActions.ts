import {loadBookmarks as getBookmarks} from '@/reducers/bookmarkSlice';
import type {RootState} from '@/store';

import apiService from '@/services/apiService';
import helper from './actionHelper';

export default {
  loadBookmarks,
  saveBookmark,
  deleteMultipleBookmarks,
  deleteBookmark,
  restoreBookmark,
  addTagsForMultipleBookmarks
};

function loadBookmarks() {
  return helper.dispatchAsyncAction(async (dispatch, getState) => {
    const state: RootState = getState();
    const searchQuery = state.bookmark.searchQuery;

    const data = await apiService.getBookmarks(searchQuery);
    dispatch(getBookmarks({total: data.total, bookmarks: data.dataItems}));

    return data.dataItems.length;
  }, false);
}

function saveBookmark(bookmark: Bookmark) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.saveBookmark(bookmark);
  }, false);
}

function deleteMultipleBookmarks(ids: number[]) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.deleteMultipleBookmarks(ids);
  }, false);
}

function deleteBookmark(id: number) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.deleteBookmark(id);
  }, false);
}

function restoreBookmark(id: number) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.restoreBookmark(id);
  }, false);
}

function addTagsForMultipleBookmarks(ids: number[], selectedTags: number[]) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.addTagsForMultipleBookmarks(ids, selectedTags);
  }, false);
}
