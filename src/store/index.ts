import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';

import commonReducer from '@/reducers/commonSlice';
import bookmarkReducer from '@/reducers/bookmarkSlice';
import tagReducer from '@/reducers/tagSlice';
import statisticsReducer from '@/reducers/statisticsSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    bookmark: bookmarkReducer,
    tag: tagReducer,
    statistics: statisticsReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
