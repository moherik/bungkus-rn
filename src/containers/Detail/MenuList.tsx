import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Heading, HStack, Image, Text, VStack} from 'native-base';

import {MenuGroupType, MenuItemType} from 'models/menuType';
import {CartItemType} from 'models/merchantType';
import {currencyFormat} from 'utils';
import {DetailScreenProps} from 'navigation/types';

type MenuItemProps = {
  menu: MenuItemType;
  merchantId: number;
  cart?: CartItemType;
} & DetailScreenProps;

const MenuItem: React.FC<MenuItemProps> = ({
  navigation,
  menu,
  merchantId,
  cart,
}) => {
  const discountPrice = menu.discount ? (menu.price / 100) * menu.discount : 0;

  const handleAddToCart = () => {
    navigation.navigate('AddToCart', {menu, merchantId, cart});
  };

  return (
    <TouchableOpacity onPress={handleAddToCart} key={menu.id}>
      <HStack pr={4} space={3} flex={1} mb={3}>
        <Box
          bg={cart ? 'red.600' : 'white'}
          pr={1}
          borderTopRightRadius="lg"
          borderBottomRightRadius="lg"
        />
        <Image
          source={{uri: menu.image}}
          alt={menu.name}
          width={100}
          height={100}
          borderRadius="lg"
        />
        <VStack space={1} flex={1}>
          <HStack space={2}>
            {cart && cart.qty > 0 && (
              <Heading size="sm" color="red.600">
                X{cart?.qty}
              </Heading>
            )}
            <Heading size="sm">{menu.name}</Heading>
          </HStack>
          {menu.description && (
            <Text fontSize="sm" color="muted.500" isTruncated>
              {menu.description}
            </Text>
          )}
          {menu.discount ? (
            <HStack space={2}>
              <Text fontSize="sm" color="red.600" fontWeight={700}>
                {currencyFormat(menu.price - discountPrice)}
              </Text>
              <Text fontSize="sm" textDecorationLine="line-through">
                {currencyFormat(menu.price)}
              </Text>
            </HStack>
          ) : (
            <Text fontSize="sm">{currencyFormat(menu.price)}</Text>
          )}
          {menu.discount && (
            <Text
              alignSelf="flex-start"
              fontSize="xs"
              color="red.600"
              borderWidth={1}
              borderColor="red.600"
              px={1}
              mt={1}>
              Diskon {menu.discount}%
            </Text>
          )}
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

type Props = {
  menus: MenuGroupType[];
  merchantId: number;
  carts: CartItemType[];
} & DetailScreenProps;

export const MenuList = ({
  navigation,
  route,
  menus,
  merchantId,
  carts,
}: Props) => {
  return (
    <VStack space={4}>
      {menus.map(menu => (
        <VStack space={4} key={menu.id}>
          <Heading size="sm" mx={4}>
            {menu.title}
          </Heading>
          <VStack space={2}>
            {menu.data.map(_menu => {
              const cart = carts.filter(
                _cart =>
                  _cart.merchantId === merchantId && _cart.menuId === _menu.id,
              )[0];

              return (
                <MenuItem
                  navigation={navigation}
                  route={route}
                  menu={_menu}
                  cart={cart}
                  merchantId={merchantId}
                  key={_menu.id}
                />
              );
            })}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};
