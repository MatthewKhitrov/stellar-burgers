import { expect } from '@jest/globals';
import {
  initialState,
  getIngredients,
  ingredientSlice
} from './IngredientsSlice';
import { ingredientsData } from './dataJestTest';

describe('Тест редьюсера ингридиетов', () => {
  const arrayIngredients = [
    {
      data: ingredientsData
    }
  ];

  test('Тест pending', () => {
    const pending = {
      ...initialState,
      loading: true,
      error: null
    };
    const action = {
      type: getIngredients.pending.type
    };
    expect(ingredientSlice.reducer(initialState, action)).toStrictEqual(
      pending
    );
  });

  test('Тест fulfilled', () => {
    const fulfilled = {
      ...initialState,
      ingredients: arrayIngredients,
      loading: false,
      error: null
    };
    const action = {
      type: getIngredients.fulfilled.type,
      payload: arrayIngredients
    };
    expect(ingredientSlice.reducer(initialState, action)).toStrictEqual(
      fulfilled
    );
  });

  test('Тест rejected', () => {
    const rejected = {
      ...initialState,
      loading: false,
      error: 'Ошибка'
    };
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Ошибка' }
    };
    expect(ingredientSlice.reducer(initialState, action)).toStrictEqual(
      rejected
    );
  });
});
