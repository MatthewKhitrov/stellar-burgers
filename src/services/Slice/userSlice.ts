import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

// Типизация
type User = {
  isAuthChecked: boolean;
  error: string | null | undefined;
  user: TUser;
};

// Асинхронный экшен
export const checkUser = createAsyncThunk('user/auth', getUserApi);
export const loginUser = createAsyncThunk('user/login', loginUserApi);
export const registerUser = createAsyncThunk('user/register', registerUserApi);
export const logOut = createAsyncThunk('user/logout', logoutApi);
export const updateUser = createAsyncThunk('user/update', updateUserApi);

//начальное состояние
export const initialState: User = {
  isAuthChecked: false,
  error: null,
  user: {
    name: '',
    email: ''
  }
};

//Слайс
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // При нажатии на кнопку Регистрация
      .addCase(registerUser.pending, (state) => {
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.error = null;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error?.message || null;
      });
    builder
      // Проверка зареган ли пользователь
      .addCase(checkUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      });
    builder
      // При нажатии на кнопку Войти
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user.email = action.payload.user.email;
        state.user.name = action.payload.user.name;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message;
      });
    builder
      // Выход из профиля
      .addCase(logOut.fulfilled, (state) => {
        state.isAuthChecked = false;
        state.user.email = '';
        state.user.name = '';
      });
    builder
      // Обновление информации о пользователе
      .addCase(updateUser.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
  }
});
