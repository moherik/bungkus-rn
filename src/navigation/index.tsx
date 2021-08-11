import React from 'react';
import {Center, Heading, Icon, Text} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppDispatch, useAppSelector} from 'hooks';
import {useCheckUserQuery} from 'services/user.service';
import {setUser} from 'stores/auth.store';
import RootStackNavigator from './RootStackNavigator';
import AuthStackNavigator from './AuthNavigation';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const {data: res, isLoading, isSuccess} = useCheckUserQuery(token || '');

  if (isLoading) {
    return (
      <Center flex={1}>
        <Icon as={<Ionicons name="fast-food-outline" />} size={16} />
        <Heading my={2}>Bungkus</Heading>
        <Text fontSize="sm" color="muted.500">
          Jelajahi menu favorit di sekitarmu
        </Text>
      </Center>
    );
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
