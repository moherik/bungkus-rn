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

import merchantSlice from './merchant.store';
import authSlice from './auth.store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';

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

export type RootState = ReturnType<typeof stores.getState>;

export type AppDispatch = typeof stores.dispatch;

const persistor = persistStore(stores);
export {persistor};
