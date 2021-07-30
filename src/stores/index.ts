import {configureStore} from '@reduxjs/toolkit';
import {userApi} from 'services/user.service';

import merchantSlice from './merchant.store';

export const stores = configureStore({
  reducer: {
    merchant: merchantSlice,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof stores.getState>;

export type AppDispatch = typeof stores.dispatch;
