import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'models/user.model';

export interface AuthState {
  user?: User;
  token?: string;
}

const initialState = {
  user: undefined,
  token: undefined,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },

    clearToken: state => {
      state.token = undefined;
    },

    setUser: (state, action: PayloadAction<User | undefined>) => {
      state.user = action.payload;
    },

    clearUser: state => {
      state.user = undefined;
    },

    signOut: state => {
      state.user = undefined;
      state.token = undefined;
    },
  },
});

export const {setToken, clearToken, setUser, clearUser, signOut} =
  authSlice.actions;

export default authSlice.reducer;
