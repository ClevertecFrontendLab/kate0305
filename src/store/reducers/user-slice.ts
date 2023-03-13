/* eslint-disable no-param-reassign */
import { Cookies } from 'react-cookie';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from '../../utils/types/book';
import { RegistrationFormValues } from '../../utils/types/registration';

const cookies = new Cookies();

interface UserReducerState {
  user: User | null;
  token: string | null;
  isAuth: boolean;
  data: RegistrationFormValues | null;
}

export const initialState: UserReducerState = {
  user: null,
  token: cookies.get('clever'),
  isAuth: Boolean(cookies.get('clever')),
  data: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ user: User; token: string; isAuth: boolean }>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
    },
    setRegistrationData(state, action: PayloadAction<RegistrationFormValues | null>) {
      state.data = action.payload;
    },
    logOut(state) {
      state.user = null;
      state.token = null;
      state.isAuth = false;
      cookies.remove('clever');
    },
  },
});

export const { setUser, setRegistrationData, logOut } = userSlice.actions;
export const userReduser = userSlice.reducer;
