import {configureStore} from '@reduxjs/toolkit';
import merchantSlice from './merchant';

export const stores = configureStore({
  reducer: {
    merchant: merchantSlice,
  },
});

export type RootState = ReturnType<typeof stores.getState>;

export type AppDispatch = typeof stores.dispatch;
