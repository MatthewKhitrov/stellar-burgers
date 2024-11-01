import { expect } from '@jest/globals';
import { initialState, orderBurger, orderSlice } from './orderSlice';
import { ingredientsData } from './dataJestTest';

describe('Тест редьюсера заказа', () => {
  const newOrder = {
    order: [Object.assign(ingredientsData[3], { id: '3' })],
    name: 'Born'
  };
  test('Тест pending', () => {
    const pending = {
      ...initialState,
      orderRequest: true
    };
    const action = {
      type: orderBurger.pending.type
    };
    expect(orderSlice.reducer(initialState, action)).toStrictEqual(pending);
  });

  test('Тест rejected', () => {
    const rejected = {
      ...initialState,
      orderRequest: false
    };
    const action = {
      type: orderBurger.rejected.type
    };
    expect(orderSlice.reducer(initialState, action)).toStrictEqual(rejected);
  });

  test('Тест fulfilled', () => {
    const fulfilled = {
        ...initialState,
        orderRequest: false,
        name: newOrder.name,
        order: newOrder.order
    };
    const action = {
      type: orderBurger.fulfilled.type,
      payload: {name: newOrder.name,  order: newOrder.order}
    };
    expect(orderSlice.reducer(initialState, action)).toStrictEqual(
      fulfilled
    );
  });
});
