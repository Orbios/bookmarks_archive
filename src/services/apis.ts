import SORT_BY from '@/constants/sortBy';
import SEARCH_MODE from '@/constants/searchMode';

import cacheHelper from '@/services/cacheHelper';
import storageHelper from '@/services/storageHelper';

export default {
  getTags,
  deleteTag,
  saveTag,
  getBookmarks,
  saveBookmark,
  deleteBookmark,
  restoreBookmark,
  deleteMultipleBookmarks,
  addTagsForMultipleBookmarks,
  getStatistic
};

let jsondata: any = null;
async function getData() {
  if (!jsondata) {
    jsondata = await storageHelper.readData();
  }
  return jsondata;
}

async function saveData() {
  const data = await getData();
  if (!data) return;
  await storageHelper.saveData(data);
}

async function getTags() {
  const data = await getData();

  let result: any = [];

  for (let tag of data.tags) {
    const newTag = Object.assign({}, tag);

    newTag.bookmarkCount = data.bookmarks.filter(bookmark => bookmark.tags.includes(tag.id)).length;

    result.push(newTag);
  }

  result.sort((x, y) => x.title.localeCompare(y.title));

  return Promise.resolve(result);
}

async function deleteTag(id) {
  const data = await getData();

  cacheHelper.deleteFromList(data.tags, tag => tag.id === id);

  for (let bookmark of data.bookmarks) {
    cacheHelper.deleteFromList(bookmark.tags, tagId => tagId === id);
  }

  return saveData();
}

async function saveTag(tag) {
  if (tag.id) {
    return updateTag(tag);
  } else {
    return addTag(tag);
  }
}

async function addTag(tag) {
  const data = await getData();

  cacheHelper.addToList(data.tags, tag);

  return saveData();
}

async function updateTag(tag) {
  const data = await getData();

  const tags = data.tags;

  for (let i = 0; i < tags.length; i++) {
    if (tags[i].id === tag.id) {
      tags[i] = tag;
    }
  }

  return saveData();
}

async function getBookmarks(searchQuery) {
  const data = await getData();

  let bookmarks = filterBookmarks(
    data.bookmarks,
    data.tags,
    searchQuery.searchMode,
    searchQuery.searchTags,
    searchQuery.includeNestedTags
  );

  bookmarks = cacheHelper.searchList(bookmarks, searchQuery.searchStr, ['title', 'url']);

  bookmarks = cacheHelper.sortList(bookmarks, searchQuery.sortBy, searchQuery.sortAsc, [
    {name: SORT_BY.TITLE, type: 'string'},
    {name: SORT_BY.CREATION_DATE, type: 'date'},
    {name: SORT_BY.LAST_EDIT_DATE, type: 'date'}
  ]);

  let result = cacheHelper.getPage(bookmarks, searchQuery.activePage, searchQuery.pageSize);

  result = await generateBookmarks(result);

  return {
    total: bookmarks.length,
    dataItems: result
  };
}

function filterBookmarks(list, tags, mode, searchedTags: TagOption[], includeNestedTags: boolean) {
  let result = list.filter(bookmark => {
    return mode === SEARCH_MODE.DELETED ? bookmark.isDeleted : !bookmark.isDeleted;
  });

  switch (mode) {
    case SEARCH_MODE.ALL:
      break;
    case SEARCH_MODE.NO_TAGS:
      result = result.filter(bookmark => {
        return bookmark.tags.length === 0;
      });
      break;
    case SEARCH_MODE.TAG_SELECTION:
      if (includeNestedTags) {
        const tagsLookup = tags.reduce((acc, tag) => {
          acc[tag.id] = tag.title;
          return acc;
        }, {});

        result = result.filter(bookmark => {
          const selectedTags = bookmark.tags.filter(id => {
            //bookmark tag in format 'IT/Programming/JavaScript'
            const bookmarkTag = tagsLookup[id];

            return searchedTags.some(t => bookmarkTag.indexOf(t.label) !== -1);
          });

          return selectedTags.length > 0;
        });
      } else {
        const tagIds = searchedTags.map(t => t.value);

        result = result.filter(bookmark => {
          const selectedTags = bookmark.tags.filter(id => {
            return tagIds.indexOf(id) !== -1;
          });

          return selectedTags.length > 0;
        });
      }

      break;
    default:
      break;
  }

  return result;
}

async function saveBookmark(bookmark) {
  if (bookmark.id) {
    return updateBookmark(bookmark);
  } else {
    return addBookmark(bookmark);
  }
}

async function updateBookmark(bookmark) {
  const data = await getData();

  const tagIds = bookmark.tags.map(t => t.id);

  const newBookmark = Object.assign({}, bookmark, {tags: tagIds});

  const bookmarks = data.bookmarks;

  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].id === bookmark.id) {
      bookmarks[i] = newBookmark;
    }
  }

  return saveData();
}

async function addBookmark(bookmark) {
  const data = await getData();

  const tagIds = bookmark.tags.map(t => t.id);

  const newBookmark = Object.assign({}, bookmark, {tags: tagIds});

  cacheHelper.addToList(data.bookmarks, newBookmark);

  return saveData();
}

async function deleteBookmark(id) {
  const data = await getData();

  const bookmarks = data.bookmarks;

  const bookmark = bookmarks.find(bm => bm.id === id);

  if (!bookmark) return;

  if (bookmark.isDeleted) {
    cacheHelper.deleteFromList(bookmarks, bookmark => bookmark.id === id);
  } else {
    bookmark.isDeleted = true;
  }

  return saveData();
}

async function restoreBookmark(id) {
  const data = await getData();

  const bookmarks = data.bookmarks;

  for (let i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].id === id) {
      bookmarks[i].isDeleted = false;
    }
  }

  return saveData();
}

function deleteMultipleBookmarks(ids) {
  for (let i = 0; i < ids.length; i++) {
    deleteBookmark(ids[i]);
  }

  return saveData();
}

async function addTagsForMultipleBookmarks(ids, tagIds) {
  const data = await getData();

  const bookmarks = data.bookmarks;

  for (let i = 0; i < ids.length; i++) {
    for (let j = 0; j < bookmarks.length; j++) {
      if (bookmarks[j].id === ids[i]) {
        let newBookmark = Object.assign({}, bookmarks[j], {tags: tagIds});

        bookmarks[j] = newBookmark;
      }
    }
  }

  return saveData();
}

async function generateBookmarks(bookmarks) {
  const data = await getData();

  let result: any = [];

  let tagLookup = {};

  for (let tag of data.tags) {
    tagLookup[tag.id] = tag;
  }

  for (let bookmark of bookmarks) {
    let tags: any = [];

    for (let tagId of bookmark.tags) {
      tags.push(tagLookup[tagId]);
    }

    result.push(
      Object.assign({}, bookmark, {
        tags,
        isTagged: tags.length ? true : false
      })
    );
  }

  return result;
}

async function getStatistic() {
  const data = await getData();

  const bookmarks = data.bookmarks;

  const deletedBookmarks = bookmarks.filter(bookmark => {
    return bookmark.isDeleted;
  });

  const taggedBookmarks = bookmarks.filter(bookmark => {
    return bookmark.tags.length;
  });

  return Promise.resolve({
    totalBookmarksCount: bookmarks.length,
    taggedBookmarksCount: taggedBookmarks.length,
    deletedBookmarksCount: deletedBookmarks.length
  });
}
