import {loadTags as getTags} from '@/reducers/tagSlice';

import apiService from '@/services/apiService';
import helper from './actionHelper';

export default {
  loadTags,
  saveTag,
  deleteTag
};

function loadTags() {
  return helper.dispatchAsyncAction(async dispatch => {
    const tags = await apiService.getTags();

    dispatch(getTags(tags));
  }, false);
}

function saveTag(tag: Tag) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.saveTag(tag);
  }, false);
}

function deleteTag(id: number) {
  return helper.dispatchAsyncAction(async () => {
    return await apiService.deleteTag(id);
  }, false);
}
