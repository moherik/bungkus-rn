import React from 'react';
import {Heading, HStack, Image, Text, VStack} from 'native-base';
import {MenuGroupType, MenuItemType} from 'models/menuType';
import {TouchableOpacity} from 'react-native';
import {currencyFormat} from 'utils';

type Props = {
  groups: MenuGroupType[];
  showOrderModal: (id: number | string) => void;
};

export const MenuList = ({groups, showOrderModal}: Props) => {
  const menuItem = (menu: MenuItemType) => (
    <TouchableOpacity onPress={() => showOrderModal(menu.id)} key={menu.id}>
      <HStack space={3} flex={1} mb={3}>
        <Image
          source={{uri: menu.image}}
          alt={menu.name}
          width={100}
          height={100}
          borderRadius="lg"
        />
        <VStack space={1} flex={1}>
          <Heading size="sm">{menu.name}</Heading>
          <Text fontSize="sm">{currencyFormat(menu.price)}</Text>
          {menu.description && (
            <Text fontSize="sm" color="gray.500" isTruncated>
              {menu.description}
            </Text>
          )}
        </VStack>
      </HStack>
    </TouchableOpacity>
  );

  return (
    <VStack space={4} mx={4}>
      {groups.map(group => (
        <VStack space={2} key={group.id}>
          <Heading size="sm">{group.title}</Heading>
          <VStack>{group.data.map(menu => menuItem(menu))}</VStack>
        </VStack>
      ))}
    </VStack>
  );
};
