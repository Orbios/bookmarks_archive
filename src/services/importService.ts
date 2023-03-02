import {find, isEmpty, forEach, startsWith} from 'lodash';

import storageHelper from './storageHelper';

const fs = require('fs-extra');
const parse5 = require('parse5');

const IMPORT_TAGS = true;
const DEFAULT_BROWSER_FOLDERS = [
  'bookmarks bar', //chrome, opera, canary
  'bookmarks toolbar', //firefox
  'favorites bar', //edge
  'other bookmarks', //common
  'mobile bookmarks' //common
];

interface ImportedBookmark {
  title: string;
  url: string;
  date: Date;
  originalPath: string;
  tag: string;
}

export default {
  importBrowserBookmarks
};

async function importBrowserBookmarks(filePath) {
  const result = {
    added: 0,
    skipped: 0
  };

  const fileData = await fs.readFile(filePath, 'utf8');

  const htmlDoc = parse5.parse(fileData);

  const htmlBody = findNode(htmlDoc, node => {
    return node.tagName === 'body';
  });

  const mainFolder = findNode(htmlBody, node => {
    return node.tagName === 'dl';
  });

  const importedBookmarks: ImportedBookmark[] = importFolder(mainFolder, [], []);

  const existingData = await storageHelper.readData();

  const urlsLookup = {};
  const newUrlsLookup = {};
  let maxId = 0;
  let tagId = existingData.tags.length;

  for (let bookmark of existingData.bookmarks) {
    urlsLookup[bookmark.url] = true;
    if (bookmark.id >= maxId) {
      maxId = bookmark.id;
    }
  }

  for (const importedBookmark of importedBookmarks) {
    if (urlsLookup[importedBookmark.url]) {
      result.skipped++;
      continue;
    }

    if (newUrlsLookup[importedBookmark.url]) {
      continue;
    }

    const bookmarkId = ++maxId;

    const newBookmark: Bookmark = {
      id: bookmarkId,
      title: importedBookmark.title,
      url: importedBookmark.url,
      isDeleted: false,
      tags: [],
      creationDate: importedBookmark.date,
      originalPath: importedBookmark.originalPath
    };

    if (IMPORT_TAGS && importedBookmark.tag) {
      const existingTag: Tag | undefined = find(existingData.tags, tag => tag.title === importedBookmark.tag);

      if (existingTag) {
        newBookmark.tags.push(existingTag.id as any);
      } else {
        const newTagId = ++tagId;

        const newTag: Tag = {
          id: newTagId,
          title: importedBookmark.tag
        };

        newBookmark.tags.push(newTag.id as any);
        existingData.tags.push(newTag);
      }
    }

    existingData.bookmarks.push(newBookmark);

    newUrlsLookup[importedBookmark.url] = true;

    result.added++;
  }

  await storageHelper.saveData(existingData);

  return Promise.resolve(result);
}

function importFolder(folderNode, pathFolders, bookmarks): ImportedBookmark[] {
  const childNodes = folderNode ? folderNode.childNodes : [];

  const length = childNodes.length;
  console.log(`Folder length: ${length}`);

  let processed = 0;
  const currentPath = pathFolders.length ? pathFolders.join('/') : '';

  while (processed < length) {
    const nodeNameString = childNodes[processed].nodeName.toLowerCase();

    if (nodeNameString === 'p' || nodeNameString === 'dd') {
      processed++;
      continue;
    }

    const nextNode = childNodes[processed].childNodes[0];

    if (nextNode.nodeName.toLowerCase() === 'a') {
      const name = getTextContent(nextNode);
      if (!name) break;
      const href = getAttr('href', nextNode);
      const timeUnix = getAttr('add_date', nextNode);
      const dateFull = getFullDate(timeUnix);

      //console.log(`Bookmark: Folder: ${folderName} Date: ${dateFull} Name: ${name} Url: ${href}`);
      const bookmark: ImportedBookmark = {
        title: name,
        url: href,
        date: dateFull,
        originalPath: currentPath.toLocaleLowerCase(),
        tag: getBookmarkTag(currentPath)
      };

      bookmarks.push(bookmark);

      processed++;
    }

    if (nextNode.nodeName.toLowerCase() === 'h3') {
      const name = getTextContent(nextNode);
      if (!name) break;
      const dateUnix = getAttr('add_date', nextNode);
      const dateFull = getFullDate(dateUnix);

      console.log(`Folder: Date: ${dateFull} Name: ${name}`);

      const subFolder = childNodes[processed].childNodes[2];
      const newPath = pathFolders.slice(0);
      newPath.push(name);
      importFolder(subFolder, newPath, bookmarks);

      processed++;
    }
  }

  return bookmarks;
}

function getAttr(name, node) {
  const attr = find(node.attrs, (attr: any) => attr.name.toLowerCase() === name);

  if (!attr) throw new Error(`Cannot find attr: ${name}`);

  return attr.value;
}

function getTextContent(node) {
  const result = node && node.childNodes['0'] ? node.childNodes['0'].value : undefined;
  if (!result) console.log(`Cannot get text content for the node`, node);
  return result;
}

function getFullDate(attrValue) {
  const unixTime = parseInt(attrValue);
  const result = new Date(unixTime * 1000);
  return result;
}

function getBookmarkTag(currentPath: string) {
  const isDefaultFolder = DEFAULT_BROWSER_FOLDERS.find(
    folder => currentPath.toLowerCase() === folder.toLocaleLowerCase()
  );
  if (isDefaultFolder) return '';

  let tag = currentPath;

  DEFAULT_BROWSER_FOLDERS.forEach(folder => {
    tag = tag.replace(new RegExp(folder, 'gi'), '');
  });

  if (startsWith(tag, '/')) tag = tag.substring(1);

  return tag;
}

function findNode(node, predicate) {
  if (!node || isEmpty(node.childNodes)) return null;

  if (predicate(node)) return node;

  let result = null;

  forEach(node.childNodes, node => {
    const match = findNode(node, predicate);
    if (match) {
      result = match;
      return false;
    }
  });

  return result;
}
