import { expect } from '@jest/globals';
import {
  addBun,
  addIngredient,
  clearBurgerConstructor,
  constructorSlice,
  deleteIngredient,
  initialState,
  changPositionIngredient
} from './constructorSlice';
import { ingredientsData } from './dataJestTest';

// Тест редьюсера конструктора

describe('Тест редьюсера конструктора', () => {
  const bun = Object.assign(ingredientsData[0]);

  const ingredients = Object.assign(ingredientsData[5], { id: '3' });

  test('Тест начального состояния', () => {
    expect(constructorSlice.reducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('Тест addBun', () => {
    const action = addBun(bun);
    expect(constructorSlice.reducer(initialState, action).bun).toEqual(bun);
  });

  test('Тест addIngredient', () => {
    const action = addIngredient(ingredients);
    expect(constructorSlice.reducer(initialState, action).ingredients).toEqual([
      ingredients
    ]);
  });
  test('Тест clearBurgerConstructor', () => {
    const state = {
      bun: bun,
      ingredients: [ingredients]
    };
    expect(constructorSlice.reducer(state, clearBurgerConstructor())).toEqual(
      initialState
    );
  });
  test('Тест deleteIngredient', () => {
    const actionAdd = addIngredient(ingredients);
    const actionRemove = deleteIngredient(0);

    expect(
      constructorSlice.reducer(
        constructorSlice.reducer(initialState, actionAdd),
        actionRemove
      ).ingredients
    ).toEqual([]);
  });

  test('Тест changPositionIngredient, вверх', () => {
    const state = {
      ...initialState,
      ingredients: [bun, ingredients]
    };
    expect(
      constructorSlice.reducer(
        state,
        changPositionIngredient({
          fromIngredient: 0,
          toIngredient: 1
        })
      ).ingredients
    ).toEqual([ingredients, bun]);
  });
  test('Тест changPositionIngredient, вниз', () => {
    const state = {
      ...initialState,
      ingredients: [bun, ingredients]
    };
    expect(
      constructorSlice.reducer(
        state,
        changPositionIngredient({
          fromIngredient: 1,
          toIngredient: 0
        })
      ).ingredients
    ).toEqual([ingredients, bun]);
  });
});
