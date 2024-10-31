import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Типизация и создание начального состояния
type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

//начальное состояние
export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

//Слайс
export const constructorSlice = createSlice({
  initialState,
  name: 'constructor',
  reducers: {
    addBun: (state, action) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    changPositionIngredient: (state, action) => {
      const { fromIngredient, toIngredient } = action.payload;
      const [removed] = state.ingredients.splice(fromIngredient, 1);
      state.ingredients.splice(toIngredient, 0, removed);
    },
    deleteIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
    clearBurgerConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const {
  addBun,
  addIngredient,
  deleteIngredient,
  changPositionIngredient,
  clearBurgerConstructor
} = constructorSlice.actions;
