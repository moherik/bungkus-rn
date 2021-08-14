import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import {createFilter} from 'redux-persist-transform-filter';
import {userApi} from 'services/user.service';

import merchantSlice, {MerchantState} from './merchant.store';
import authSlice, {AuthState} from './auth.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';

interface AppState {
  auth: AuthState;
  merchant: MerchantState;
}

const reducers = combineReducers({
  auth: authSlice,
  merchant: merchantSlice,
  [userApi.reducerPath]: userApi.reducer,
});

const merchantFilter = createFilter('merchant', ['carts', 'selectedCarts']);

const persistedReducers = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['auth', 'merchant'],
    transforms: [merchantFilter],
  },
  reducers,
);

export const stores = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(userApi.middleware),
});

export type RootState = AppState;

export type AppDispatch = typeof stores.dispatch;

export const persistor = persistStore(stores);
