import { expect } from '@jest/globals';
import {
    initialState,
    getOrderList,
    orderListSlice
  } from './orderListSlice';
  import { ordersData } from './dataJestTest';

  describe ('Тест редьюсера листа заказов', () => {
    const order = ordersData;

    test('Тест fulfilled', () => {
        const fulfilled = {
          ...initialState,
          orders: order
        };
        const action = {
          type: getOrderList.fulfilled.type,
          payload: order
        };
        expect(orderListSlice.reducer(initialState, action)).toStrictEqual(
          fulfilled
        );
      });

  })