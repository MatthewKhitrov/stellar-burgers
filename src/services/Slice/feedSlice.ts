import { TOrder, TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

// Типизация и создание начального состояния
type TFeedState = {
  feeds: TOrdersData;
  loading: boolean;
  error: string | null | undefined;
};

//начальное состояние
const initialState: TFeedState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  loading: false,
  error: null
};

// Асинхронный экшен
export const getFeeds = createAsyncThunk('ingredients/getFeeds', async () =>
  getFeedsApi()
);

//Слайс
export const feedsSlice = createSlice({
  initialState,
  name: 'feeds',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feeds = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});
