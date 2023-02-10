const jsonfile = require('jsonfile');
const _ = require('lodash');
const dateFns = require('date-fns');

//use your db path (can be found in the preferences of the app)
const DB_PATH = './scripts/data/sample.json';

//create new file with the formated data or use the same DB_PATH to override the original file
const FORMATED_DB_PATH = './scripts/data/sample-formated.json';

async function main() {
  try {
    const db = await jsonfile.readFile(DB_PATH);

    db.bookmarks.forEach(bookmark => {
      bookmark.creationDate = convertDateToRawFormat(bookmark.creationDate);
    });

    await jsonfile.writeFile(FORMATED_DB_PATH, db);

    console.log('Done!');
  } catch (err) {
    console.log(err);
  }
}

function convertDateToRawFormat(date) {
  if (!isValidDate(date)) return date;

  return new Date(date);
}

function isValidDate(dateString) {
  return dateFns.isValid(new Date(dateString));
}

main();
