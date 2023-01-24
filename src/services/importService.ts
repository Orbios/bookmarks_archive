import {find, isEmpty, forEach} from 'lodash';
import {format} from 'date-fns';

import storageHelper from './storageHelper';

const fs = require('fs-extra');
const parse5 = require('parse5');

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

  const bookmarks = importFolder(mainFolder, [], []);

  const existingData = await storageHelper.readData();

  const urlsLookup = {};
  const newUrlsLookup = {};
  let maxId = 0;

  for (let bookmark of existingData.bookmarks) {
    urlsLookup[bookmark.url] = true;
    if (bookmark.id >= maxId) {
      maxId = bookmark.id;
    }
  }

  for (let bookmark of bookmarks) {
    if (urlsLookup[bookmark.url]) {
      result.skipped++;
      continue;
    }

    if (newUrlsLookup[bookmark.url]) {
      continue;
    }

    const bookmarkId = ++maxId;

    const newBookmark = {
      id: bookmarkId,
      title: bookmark.title,
      url: bookmark.url,
      isDeleted: false,
      tags: [],
      creationDate: bookmark.date,
      originalPath: bookmark.originalPath
    };

    existingData.bookmarks.push(newBookmark);

    newUrlsLookup[bookmark.url] = true;

    result.added++;
  }

  await storageHelper.saveData(existingData);

  return Promise.resolve(result);
}

function importFolder(folderNode, pathFolders, bookmarks) {
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
      const bookmark = {
        title: name,
        url: href,
        date: dateFull,
        originalPath: currentPath.toLocaleLowerCase()
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
  const result = format(new Date(unixTime * 1000), 'MM/dd/yyyy');
  return result;
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
