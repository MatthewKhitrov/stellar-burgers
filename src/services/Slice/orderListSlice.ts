import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

// Типизация
type OrderList = {
  orders: TOrder[];
};

// Асинхронный экшен
export const getOrderList = createAsyncThunk(
  'order/getOrderList',
  getOrdersApi
);

//начальное состояние
export const initialState: OrderList = {
  orders: []
};

//Слайс
export const orderListSlice = createSlice({
  name: 'orderListSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOrderList.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});
