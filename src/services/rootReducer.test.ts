import { expect } from '@jest/globals';
import rootReducer from './rootReducer';
import { initialState as ingredientsState } from './Slice/IngredientsSlice';
import { initialState as feedsState } from './Slice/feedSlice';
import { initialState as constructorState } from './Slice/constructorSlice';
import { initialState as userState } from './Slice/userSlice';
import { initialState as orderListState } from './Slice/orderListSlice';
import { initialState as orderState } from './Slice/orderSlice';

// Состояние редьюсера каким оно должно быть
const testState = {
  ingredients: ingredientsState,
  feeds: feedsState,
  constructorBurger: constructorState,
  userInfo: userState,
  orderList: orderListState,
  order: orderState
};

// Проверка инициализации состояния корневого редьюсера
describe('Проверка правильной инициализации rootReducer.', () => {
  test('Тест rootReducer', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);
    expect(newState).toStrictEqual(testState);
  });
});
