import { combineReducers } from '@reduxjs/toolkit';
import { ingredientSlice } from './Slice/IngredientsSlice';
import { constructorSlice } from './Slice/constructorSlice';
import { feedsSlice } from './Slice/feedSlice';
import { userSlice } from './Slice/userSlice';
import { orderListSlice } from './Slice/orderListSlice';
import { orderSlice } from './Slice/orderSlice';

const rootReducer = combineReducers({
  ingredients: ingredientSlice.reducer,
  constructorBurger: constructorSlice.reducer,
  feeds: feedsSlice.reducer,
  userInfo: userSlice.reducer,
  orderList: orderListSlice.reducer,
  order: orderSlice.reducer
});

export default rootReducer;
