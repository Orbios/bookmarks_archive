import {format} from 'date-fns';
import {isDate} from 'lodash';

import config from '@/config';

export default {
  displayDate
};

function displayDate(date) {
  if (!isDate(date)) return date;

  return format(new Date(date), config.format.date);
}
