import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Actionsheet,
  Box,
  Heading,
  HStack,
  Image,
  Text,
  useDisclose,
  VStack,
  Pressable,
  Center,
} from 'native-base';

import {MenuItemType} from 'models/menuType';
import {CartItemType, MerchantType} from 'models/merchantType';
import {DetailScreenProps} from 'navigation/types';
import {currencyFormat} from 'utils';
import {useAppDispatch} from 'hooks';
import {deleteCart} from 'stores/merchant';

type MenuItemProps = {
  menu: MenuItemType;
  merchant: MerchantType;
  carts?: CartItemType[];
} & DetailScreenProps;

export const MenuItem: React.FC<MenuItemProps> = ({
  navigation,
  menu,
  merchant,
  carts,
}) => {
  const {isOpen, onOpen, onClose} = useDisclose();
  const dispatch = useAppDispatch();

  const discountPrice = menu.discount ? (menu.price / 100) * menu.discount : 0;

  const getCarts =
    carts?.filter(
      _cart => _cart.merchantId === merchant.id && _cart.menuId === menu.id,
    ) || [];

  const qty = getCarts.reduce((acc, cart) => acc + cart.qty, 0);
  const totalPrice = getCarts.reduce((acc, cart) => acc + cart.price, 0);

  const handleAddToCart = () => {
    if (getCarts.length <= 0) {
      navigation.navigate('AddToCart', {menu, merchant});
    } else if (getCarts.length > 0) {
      if (menu.variants && menu.variants?.length > 0) {
        onOpen();
      } else {
        navigation.navigate('AddToCart', {menu, merchant, cart: getCarts[0]});
      }
    }
  };

  const handleAddNew = () => {
    onClose();
    navigation.navigate('AddToCart', {menu, merchant});
  };

  const handleDeleteById = (id: number) => dispatch(deleteCart(id));

  const handleEditById = (id: number) => {
    onClose();
    const cart = getCarts.filter(_cart => _cart.id === id)[0];
    navigation.navigate('AddToCart', {menu, merchant, cart});
  };

  return (
    <>
      <TouchableOpacity onPress={handleAddToCart} key={menu.id}>
        <HStack pr={4} space={3} my={3}>
          <Box
            bg={getCarts.length > 0 ? 'red.600' : 'white'}
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
              {getCarts.length > 0 && qty > 0 && (
                <Heading size="sm" color="red.600">
                  {qty}x
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

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <VStack width={'100%'} space={4} px={2}>
            {getCarts.map((cart, index) => {
              let listName: string[][] = [];

              cart.extras.forEach(extra => {
                const name: string[] = extra.items.map(item => item.itemName);
                listName.push(name);
              });

              const listNames = listName.join().split(',');

              return (
                <HStack
                  justifyContent="space-between"
                  key={index}
                  pb={4}
                  borderBottomWidth={1}
                  borderBottomColor="gray.100">
                  <HStack space={5}>
                    <Heading size="sm">{cart.qty}x</Heading>
                    <VStack>
                      <Heading size="sm">{cart.menuName}</Heading>
                      {cart.extras.length > 0 && (
                        <Box mb={1}>
                          {listNames.map((name, _index) => (
                            <Text key={_index} fontSize="sm">
                              {name}
                            </Text>
                          ))}
                        </Box>
                      )}
                      <HStack space={2}>
                        <Pressable onPress={() => handleEditById(cart.id)}>
                          <Text fontSize="sm" color="blue.600" fontWeight={700}>
                            Edit
                          </Text>
                        </Pressable>
                        <Pressable onPress={() => handleDeleteById(cart.id)}>
                          <Text fontSize="sm" color="red.600" fontWeight={700}>
                            Hapus
                          </Text>
                        </Pressable>
                      </HStack>
                    </VStack>
                  </HStack>
                  <Text>{currencyFormat(cart.price)}</Text>
                </HStack>
              );
            })}
            {getCarts.length > 1 && (
              <HStack pb={2} justifyContent="space-between" alignItems="center">
                <Text>Total</Text>
                <Heading size="sm">{currencyFormat(totalPrice)}</Heading>
              </HStack>
            )}

            <Box mt={2} mb={2}>
              <TouchableOpacity onPress={handleAddNew}>
                <Center bg="red.600" p={4} borderRadius="lg">
                  <Text color="white" fontWeight={700}>
                    Tambah Satu Lagi
                  </Text>
                </Center>
              </TouchableOpacity>
            </Box>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
