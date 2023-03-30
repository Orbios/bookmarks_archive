import config from '@/config';

import apis from '@/services/apis';
import importService from '@/services/importService';

export default {
  getBookmarks,
  saveBookmark,
  deleteBookmark,
  restoreBookmark,
  deleteMultipleBookmarks,
  addTagsForMultipleBookmarks,
  getStatistic,
  getTags,
  deleteTag,
  saveTag,
  importBookmarks
};

async function getBookmarks(searchQuery) {
  const data = {
    activePage: searchQuery.activePage,
    sortBy: searchQuery.sortBy,
    sortAsc: searchQuery.sortAsc,
    searchStr: searchQuery.searchStr,
    searchMode: searchQuery.searchMode,
    searchTags: searchQuery.searchTags,
    includeNestedTags: searchQuery.includeNestedTags,
    pageSize: config.pageSize
  };

  const result = await apis.getBookmarks(data);

  return result;
}

async function saveBookmark(bookmark) {
  return await apis.saveBookmark(bookmark);
}

async function deleteBookmark(id) {
  return await apis.deleteBookmark(id);
}

async function restoreBookmark(id) {
  return await apis.restoreBookmark(id);
}

async function deleteMultipleBookmarks(ids) {
  return await apis.deleteMultipleBookmarks(ids);
}

async function addTagsForMultipleBookmarks(ids, selectedTags) {
  return await apis.addTagsForMultipleBookmarks(ids, selectedTags);
}

async function getStatistic() {
  return apis.getStatistic();
}

async function getTags() {
  return apis.getTags();
}

async function deleteTag(id) {
  return await apis.deleteTag(id);
}

async function saveTag(tag) {
  return await apis.saveTag(tag);
}

async function importBookmarks(filePath: string) {
  try {
    return await importService.importBrowserBookmarks(filePath);
  } catch (err) {
    console.log('Import error: ', err);
  }
}
