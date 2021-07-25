import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'models/user.model';

interface AuthState {
  user?: User;
}

const initialState = {
  user: undefined,
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string | undefined>) => {
      const token = action.payload;
      if (token) {
        state.user = {
          name: 'Erik Maulana',
        };
      }
    },
  },
});

const {reducer, actions} = authSlice;

export const {login} = actions;

export default reducer;
