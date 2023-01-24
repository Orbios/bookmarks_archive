import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface StatisticsState {
  totalBookmarksCount: number;
  taggedBookmarksCount: number;
  deletedBookmarksCount: number;
}

const initialState: StatisticsState = {
  totalBookmarksCount: 0,
  taggedBookmarksCount: 0,
  deletedBookmarksCount: 0
};

export const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    loadStatistics: (state, action: PayloadAction<StatisticsState>) => {
      state.totalBookmarksCount = action.payload.totalBookmarksCount;
      state.taggedBookmarksCount = action.payload.taggedBookmarksCount;
      state.deletedBookmarksCount = action.payload.deletedBookmarksCount;
    }
  }
});

export const {loadStatistics} = statisticsSlice.actions;

export default statisticsSlice.reducer;
