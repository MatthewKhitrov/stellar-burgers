import { expect } from '@jest/globals';
import { initialState, getFeeds, feedsSlice } from './feedSlice';
import { ordersData } from './dataJestTest';

describe('Тест редьюсера ленты', () => {
  const feedsArray = {
    orders: ordersData,
    total: 89898,
    totalToday: 415
  };

  test('Тест pending', () => {
    const pending = {
      ...initialState,
      loading: true,
      error: null
    };
    const action = {
      type: getFeeds.pending.type
    };
    expect(feedsSlice.reducer(initialState, action)).toStrictEqual(pending);
  });

  test('Тест fulfilled', () => {
    const fulfilled = {
      ...initialState,
      feeds: feedsArray,
      loading: false,
      error: null,
    
    };
    const action = {
      type: getFeeds.fulfilled.type,
      payload: feedsArray
    };
    expect(feedsSlice.reducer(initialState, action)).toStrictEqual(fulfilled);
  });

  test('Тест rejected', () => {
    const rejected = {
      ...initialState,
      loading: false,
      error: 'Ошибка',
    
    };
    const action = {
      type: getFeeds.rejected.type,
      error: {message: 'Ошибка'}
    };
    expect(feedsSlice.reducer(initialState, action)).toStrictEqual(rejected);
  });

});
