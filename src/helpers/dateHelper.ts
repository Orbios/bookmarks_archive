import {format, isValid} from 'date-fns';

import config from '@/config';

export default {
  displayDate,
  isValidDate
};

function displayDate(date) {
  if (!isValidDate(date)) return date;

  return format(new Date(date), config.format.date);
}

function isValidDate(dateString: string) {
  return isValid(new Date(dateString));
}
