import {loadStatistics as getStatistics} from '@/reducers/statisticsSlice';

import apiService from '@/services/apiService';
import helper from './actionHelper';

export default {
  loadStatistics
};

function loadStatistics() {
  return helper.dispatchAsyncAction(async dispatch => {
    const statistics = await apiService.getStatistic();
    dispatch(getStatistics(statistics));
  }, false);
}
