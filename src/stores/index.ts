import {configureStore} from '@reduxjs/toolkit';
import menusSlice from './menus';

export const stores = configureStore({
  reducer: {
    menu: menusSlice,
  },
});

export type RootState = ReturnType<typeof stores.getState>;

export type AppDispatch = typeof stores.dispatch;
