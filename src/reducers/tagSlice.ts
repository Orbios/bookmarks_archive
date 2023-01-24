import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface TagState {
  list: Tag[];
  options: TagOption[];
}

const initialState: TagState = {
  list: [],
  options: []
};

export const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    loadTags: (state, action: PayloadAction<Tag[]>) => {
      state.list = action.payload;
      state.options = action.payload.map(tag => ({
        value: tag.id,
        label: tag.title
      }));
    }
  }
});

export const {loadTags} = tagSlice.actions;

export default tagSlice.reducer;
