import React from 'react';
import {useAppDispatch, useAppSelector} from 'hooks';
import {useCheckUserQuery} from 'services/user.service';
import {setUser} from 'stores/auth.store';
import {Text} from 'native-base';
import RootStackNavigator from './RootStackNavigator';
import AuthStackNavigator from './AuthNavigation';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const {data: res, isLoading, isSuccess} = useCheckUserQuery(token || '');

  if (isLoading) {
    return <Text>Loading....</Text>;
  }

  if (isSuccess) {
    dispatch(setUser(res?.data));
  }

  return token && res?.data.name ? (
    <RootStackNavigator />
  ) : (
    <AuthStackNavigator />
  );
};
