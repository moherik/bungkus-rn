import React from 'react';
import {Text, VStack} from 'native-base';

import {Button} from 'components';
import {useAppDispatch} from 'hooks';
import {signOut} from 'stores/auth.store';

type Props = {};

export const Footer: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <VStack p={4} space={2}>
      <Button
        onPress={handleLogout}
        px={4}
        py={3}
        bg="gray.100"
        color="black"
        borderRadius="lg"
        fontWeight="normal"
        textTransform="none">
        Keluar dari Aplikasi
      </Button>
      <Text fontSize="sm" color="muted.500" textAlign="center">
        Bungkus App v.1.0.0
      </Text>
    </VStack>
  );
};
