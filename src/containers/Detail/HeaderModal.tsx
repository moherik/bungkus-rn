import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Text, Center, HStack, Icon, Image, ZStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MenuType} from 'models/menu/type';

type Props = {
  menu: MenuType;
  height: number;
  closeModal: () => void;
};

export const HeaderModal = ({menu, height, closeModal}: Props) => (
  <ZStack width={'100%'} height={height}>
    <Image
      source={{uri: menu.image}}
      alt={menu.name}
      width={'100%'}
      height={height}
    />
    <HStack
      width={'100%'}
      alignItems="center"
      justifyContent="space-between"
      p={4}
      space={2}>
      <TouchableOpacity onPress={() => closeModal()}>
        <Box bg="white" borderRadius={100} p={2}>
          <Icon as={<Ionicons name="arrow-back-outline" />} size={5} />
        </Box>
      </TouchableOpacity>

      <HStack reversed alignItems="center" space={2}>
        <TouchableOpacity onPress={() => {}}>
          <Center bg="white" borderRadius={100} p={2}>
            <Icon as={<Ionicons name="heart-outline" />} size={5} />
          </Center>
        </TouchableOpacity>
        <Box bg="red.600" borderRadius={100} px={2} py={1}>
          <Text color="white" fontSize="xs" textTransform="uppercase">
            Diskon 50%
          </Text>
        </Box>
      </HStack>
    </HStack>
  </ZStack>
);
