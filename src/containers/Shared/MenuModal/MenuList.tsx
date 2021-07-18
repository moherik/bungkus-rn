import React, {useEffect, useState} from 'react';
import {Box, Heading, HStack, Image, Text, VStack} from 'native-base';
import {MenuGroupType, MenuItemType} from 'models/menuType';
import {TouchableOpacity} from 'react-native';
import {currencyFormat} from 'utils';
import {useAppSelector} from 'hooks';

type MenuItemProps = {
  menu: MenuItemType;
  showOrderModal: (id: number | string) => void;
};

const MenuItem: React.FC<MenuItemProps> = ({menu, showOrderModal}) => {
  const [inCart, setInCart] = useState<boolean>(false);
  const [cartQty, setCartQty] = useState<number>(0);

  const merchantId = useAppSelector(
    state => state.merchant.selectedMerchant?.id,
  );
  const carts = useAppSelector(state => state.merchant.carts);

  useEffect(() => {
    const cart = carts.filter(
      _cart => _cart.merchantId === merchantId && _cart.menuId === menu.id,
    )[0];
    if (cart) {
      setCartQty(cart.qty);
      setInCart(true);
    }

    return () => {
      setInCart(false);
      setCartQty(0);
    };
  }, [carts, merchantId, menu.id]);

  const discountPrice = menu.discount ? (menu.price / 100) * menu.discount : 0;

  return (
    <TouchableOpacity onPress={() => showOrderModal(menu.id)} key={menu.id}>
      <HStack
        pl={2}
        pr={4}
        space={3}
        flex={1}
        mb={3}
        borderLeftWidth={5}
        borderLeftColor={inCart ? 'red.600' : 'white'}>
        <Image
          source={{uri: menu.image}}
          alt={menu.name}
          width={100}
          height={100}
          borderRadius="lg"
        />
        <VStack space={1} flex={1}>
          <HStack space={2}>
            {inCart && (
              <Heading size="sm" color="red.600">
                {cartQty}X
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
  );
};

type Props = {
  groups: MenuGroupType[];
  showOrderModal: (id: number | string) => void;
};

export const MenuList = ({groups, showOrderModal}: Props) => {
  return (
    <VStack space={4}>
      {groups.map(group => (
        <VStack space={4} key={group.id}>
          <Heading size="sm" mx={4}>
            {group.title}
          </Heading>
          <VStack space={2}>
            {group.data.map(menu => (
              <MenuItem
                menu={menu}
                showOrderModal={showOrderModal}
                key={menu.id}
              />
            ))}
          </VStack>
        </VStack>
      ))}
    </VStack>
  );
};
