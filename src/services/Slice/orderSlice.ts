import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';

// Типизация
type NewOrder = {
  order: TOrder | null;
  name: string;
  orderRequest: boolean;
};

// Асинхронный экшен
export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  orderBurgerApi
);

//начальное состояние
export const initialState: NewOrder = {
  order: null,
  name: '',
  orderRequest: false
};

//Слайс
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
        state.name = action.payload.name;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
