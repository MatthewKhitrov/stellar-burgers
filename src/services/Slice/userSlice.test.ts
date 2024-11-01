import { expect } from '@jest/globals';
import {
  initialState,
  checkUser,
  loginUser,
  registerUser,
  logOut,
  updateUser,
  userSlice
} from './userSlice';
import { ingredientsData } from './dataJestTest';

describe('Тест редьюсера пользователя', () => {
  const newUser = {
    user: {
      name: 'Born',
      email: 'Jason'
    }
  };
  const emptyUser = {
    user: {
      name: '',
      email: ''
    }
  };
  test('Тест pending, проверка зареган ли пользователь', () => {
    const pending = {
      ...initialState,
      isAuthChecked: false,
      error: null
    };
    const action = {
      type: checkUser.pending.type
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(pending);
  });

  test('Тест fulfilled, проверка зареган ли пользователь', () => {
    const fulfilled = {
      ...initialState,
      error: null,
      isAuthChecked: true
    };
    const action = {
      type: checkUser.fulfilled.type,
      payload: emptyUser
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(fulfilled);
  });

  test('Тест rejected, проверка зареган ли пользователь', () => {
    const rejected = {
      ...initialState,
      error: 'Ошибка',
      isAuthChecked: false
    };
    const action = {
      type: checkUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(rejected);
  });

  test('Тест pending, при нажатие на кнопку регистрации', () => {
    const pending = {
      ...initialState,
      error: null
    };
    const action = {
      type: registerUser.pending.type
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(pending);
  });

  test('Тест fulfilled, при нажатие на кнопку регистрации', () => {
    const fulfilled = {
      ...initialState,
      error: null,
      isAuthChecked: true,
      user: newUser.user
    };
    const action = {
      type: registerUser.fulfilled.type,
      payload: newUser
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(fulfilled);
  });

  test('Тест rejected, при нажатие на кнопку регистрации', () => {
    const rejected = {
      ...initialState,
      error: 'Ошибка',
      isAuthChecked: false
    };
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(rejected);
  });

  test('Тест pending, при нажатие на кнопку войти', () => {
    const pending = {
      ...initialState,
      error: null,
      isAuthChecked: false
    };
    const action = {
      type: loginUser.pending.type
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(pending);
  });

  test('Тест fulfilled, при нажатие на кнопку войти', () => {
    const fulfilled = {
      ...initialState,
      error: null,
      isAuthChecked: true,
      user: newUser.user
    };
    const action = {
      type: loginUser.fulfilled.type,
      payload: newUser
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(fulfilled);
  });

  test('Тест rejected, при нажатие на кнопку войти', () => {
    const rejected = {
      ...initialState,
      error: 'Ошибка',
      isAuthChecked: false
    };
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(rejected);
  });

  test('Тест fulfilled, выход из профиля', () => {
    const fulfilled = {
      ...initialState,
      error: null,
      isAuthChecked: false
    };
    const action = {
      type: logOut.fulfilled.type
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(fulfilled);
  });

  test('Тест pending, обновление информации о пользователе', () => {
    const pending = {
      ...initialState,
      error: null,
      isAuthChecked: false
    };
    const action = {
      type: updateUser.pending.type
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(pending);
  });

  test('Тест fulfilled, обновление информации о пользователе', () => {
    const fulfilled = {
      ...initialState,
      error: null,
      isAuthChecked: true,
      user: newUser.user
    };
    const action = {
      type: updateUser.fulfilled.type,
      payload: newUser
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(fulfilled);
  });

  test('Тест rejected, при нажатие на кнопку войти', () => {
    const rejected = {
      ...initialState,
      error: 'Ошибка',
      isAuthChecked: false
    };
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка' }
    };
    expect(userSlice.reducer(initialState, action)).toStrictEqual(rejected);
  });
});
