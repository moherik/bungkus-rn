import React from 'react';
import {Avatar, Heading, HStack, VStack, Text} from 'native-base';
import {useAppSelector} from 'hooks';
import {getInitialOfString} from 'utils';
import {Ripple, Button} from 'components';
import {useNavigation} from '@react-navigation/native';

type Props = {};

export const Header: React.FC<Props> = ({}) => {
  const user = useAppSelector(state => state.auth.user);
  const navigation = useNavigation();

  return (
    <Ripple onPress={() => navigation.navigate('User')}>
      <VStack p={4} borderBottomWidth={1} borderBottomColor="muted.100">
        <HStack alignItems="center" space={4}>
          {user?.avatarUrl ? (
            <Avatar source={{uri: user?.avatarUrl}} />
          ) : (
            <Avatar bgColor="red.600" _text={{fontSize: 22, fontWeight: 800}}>
              {getInitialOfString(user?.name!!)}
            </Avatar>
          )}
          <VStack flex={1}>
            <HStack justifyContent="space-between" alignItems="center">
              <Heading size="md">{user?.name}</Heading>
            </HStack>
            <Text fontSize="sm">{`+62${user?.phone}`}</Text>
          </VStack>
          <Text
            borderColor="muted.400"
            borderWidth={1}
            borderRadius={100}
            px={2}
            fontSize="sm">
            Basic
          </Text>
        </HStack>
        <Button
          mt={4}
          py={2}
          borderColor="muted.200"
          borderWidth={1}
          bg="transparent"
          color="muted.700"
          borderRadius="lg"
          onPress={() => {}}>
          Upgrade
        </Button>
      </VStack>
    </Ripple>
  );
};
