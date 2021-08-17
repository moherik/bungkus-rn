import React from 'react';
import {Avatar, Heading, HStack, VStack} from 'native-base';
import {useAppSelector} from 'hooks';
import {getInitialOfString} from 'utils';

type Props = {};

export const Header: React.FC<Props> = ({}) => {
  const user = useAppSelector(state => state.auth.user);

  return (
    <VStack bg="white" shadow={2} px={4} py={3}>
      <HStack alignItems="center" space={4} justifyContent="space-between">
        <Heading size="md">{user?.name}</Heading>
        {user?.avatarUrl ? (
          <Avatar source={{uri: user?.avatarUrl}} size="sm" />
        ) : (
          <Avatar bgColor="red.600" _text={{fontWeight: 800}} size="sm">
            {getInitialOfString(user?.name!!)}
          </Avatar>
        )}
      </HStack>
    </VStack>
  );
};
