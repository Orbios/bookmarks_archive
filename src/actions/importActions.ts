import apiService from '@/services/apiService';
import helper from './actionHelper';

export default {
  importBookmarks
};

function importBookmarks(filePath: string) {
  return helper.dispatchAsyncAction(async () => {
    const result = await apiService.importBookmarks(filePath);
    return result;
  }, false);
}
