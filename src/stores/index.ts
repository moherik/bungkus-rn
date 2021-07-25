import {configureStore} from '@reduxjs/toolkit';
import {authApi} from 'services/auth.service';

import merchantSlice from './merchant.store';
import authSlice from './auth.store';

export const stores = configureStore({
  reducer: {
    merchant: merchantSlice,
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof stores.getState>;

export type AppDispatch = typeof stores.dispatch;
