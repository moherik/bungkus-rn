import React from 'react';
import {Center, Heading, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppDispatch, useAppSelector} from 'hooks';
import {useCheckUserQuery} from 'services/user.service';
import {setUser} from 'stores/auth.store';
import {Button, Ripple} from 'components';

import Auth from './AuthStack';
import BottomTab from './BottomTab';

export const Navigation = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);

  const {
    data: res,
    isLoading,
    isError,
    error,
    refetch,
    isSuccess,
  } = useCheckUserQuery(token || '');

  if (isLoading) {
    return (
      <Center flex={1}>
        <Icon as={<Ionicons name="fast-food-outline" />} size={16} />
        <Heading mt={2}>Bungkus</Heading>
        <Text fontSize="sm" color="muted.500">
          Jelajahi menu favorit di sekitarmu
        </Text>
      </Center>
    );
  }

  if (token && isError) {
    return (
      <Center flex={1}>
        <Icon as={<Ionicons name="alert-circle-outline" />} size={16} />
        <VStack mt={2} alignItems="center">
          <Heading size="md">Terjadi Kesalahan</Heading>
          <HStack space={2}>
            <Text fontSize="sm" color="muted.500">
              {(error as any)?.message!!}
            </Text>
            <Ripple onPress={refetch}>
              <Text fontSize="sm" color="blue.600">
                Coba ulang
              </Text>
            </Ripple>
          </HStack>
          <Button onPress={() => {}} py={2} px={4} mt={4} borderRadius="lg">
            Bantuan
          </Button>
        </VStack>
      </Center>
    );
  }

  if (token && isSuccess) {
    dispatch(setUser(res?.data));
  }

  return token && res?.data.name ? <BottomTab /> : <Auth />;
};
