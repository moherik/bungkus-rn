import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Heading, HStack, Image, Text, VStack} from 'native-base';
import {Modalize} from 'react-native-modalize';

import {MenuGroupType, MenuItemType} from 'models/menuType';
import {CartItemType} from 'models/merchantType';

import {currencyFormat} from 'utils';
import {useAppSelector} from 'hooks';
import {OrderModal} from '../OrderModal';

type MenuItemProps = {
  menu: MenuItemType;
  merchantId: number;
  cart?: CartItemType;
};

const MenuItem: React.FC<MenuItemProps> = ({menu, merchantId, cart}) => {
  const orderModalRef = useRef<Modalize>(null);

  const handleShowOrderModal = () => {
    orderModalRef.current?.open();
  };

  const handleCloseOrderModal = () => {
    orderModalRef.current?.close();
  };

  const discountPrice = menu.discount ? (menu.price / 100) * menu.discount : 0;

  return (
    <>
      <TouchableOpacity onPress={() => handleShowOrderModal()} key={menu.id}>
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
            {menu.description && (
              <Text fontSize="sm" color="gray.500" isTruncated>
                {menu.description}
              </Text>
            )}
            {menu.discount && (
              <Box
                mt={1}
                alignSelf="flex-start"
                borderWidth={1}
                borderColor="red.600"
                px={2}
                py={1}
                borderRadius="lg">
                <Text fontSize="xs" color="red.600">
                  Diskon {menu.discount}%
                </Text>
              </Box>
            )}
          </VStack>
        </HStack>
      </TouchableOpacity>
      <OrderModal
        ref={orderModalRef}
        merchantId={merchantId}
        menu={menu}
        cart={cart}
        closeModal={handleCloseOrderModal}
      />
    </>
  );
};

type Props = {
  groups: MenuGroupType[];
  merchantId: number;
};

export const MenuList = ({groups, merchantId}: Props) => {
  const carts = useAppSelector(state => state.merchant.carts);

  return (
    <VStack space={4}>
      {groups.map(group => (
        <VStack space={4} key={group.id}>
          <Heading size="sm" mx={4}>
            {group.title}
          </Heading>
          <VStack space={2}>
            {group.data.map(menu => {
              const cart = carts.filter(
                _cart =>
                  _cart.merchantId === merchantId && _cart.menuId === menu.id,
              )[0];

              return (
                <MenuItem
                  menu={menu}
                  cart={cart}
                  merchantId={merchantId}
                  key={menu.id}
                />
              );
            })}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};
