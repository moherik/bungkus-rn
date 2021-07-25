import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, Heading, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {currencyFormat} from 'utils';
import {Separator, Button} from 'components';
import {useAppDispatch} from 'hooks';
import {addToCart, deleteCart, updateCart} from 'stores/merchant.store';
import {CartItem, Extras} from 'models/merchant.model';
import {MenuItem} from 'models/menu.model';
import {AddToCartScreenProps} from 'navigation/types';

export type ExtraPriceType = {
  item: number;
  total: number;
};

type Props = {
  merchantId: number;
  cart?: CartItem;
  menu: MenuItem;
  extras?: Extras[];
  note?: string;
} & AddToCartScreenProps;

export const Footer = ({
  navigation,
  merchantId,
  cart,
  menu,
  extras,
  note,
}: Props) => {
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState<number>(cart?.qty || 1);
  const [totalPrice, setTotalPrice] = useState<{
    price: number;
    discount: number;
    extras: number;
  }>({
    price: 0,
    discount: 0,
    extras: 0,
  });

  useEffect(() => {
    let totalItem = 0;
    const selectedExtras = extras?.map(extra => {
      totalItem = totalItem + extra.items.filter(item => item.price > 0).length;
      return extra.items.reduce((acc, item) => acc + Number(item.price), 0);
    });

    const totalExtraPrice = selectedExtras?.reduce(
      (acc, value) => acc + Number(value),
      0,
    );

    const discountPrice = menu.discount
      ? (menu.price / 100) * menu.discount
      : null;

    const price = discountPrice
      ? menu.price * qty - discountPrice
      : menu.price * qty;

    setTotalPrice({
      price: price + (totalExtraPrice || 0),
      discount: discountPrice || 0,
      extras: totalExtraPrice || 0,
    });

    return () => {
      setTotalPrice({
        price: 0,
        discount: 0,
        extras: 0,
      });
    };
  }, [extras, cart, menu.discount, menu.price, qty]);

  const handleAddQty = () => setQty(qty + 1);

  const handleMinQty = () => qty !== 1 && setQty(qty - 1);

  const handleAddToCart = () => {
    const data: CartItem = {
      id: 0,
      merchantId,
      menuId: Number(menu.id),
      menuName: menu.name,
      qty,
      price: totalPrice.price,
      discount: menu.discount || 0,
      note: note || '',
      extras: extras || [],
    };

    if (!cart) {
      dispatch(addToCart(data));
    } else {
      dispatch(updateCart({id: cart.id, data}));
    }

    navigation.goBack();
  };

  const handleDeleteCart = (id: number) => {
    dispatch(deleteCart(id));

    navigation.goBack();
  };

  return (
    <VStack shadow={4} py={2} bg="white">
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Text fontSize="sm" color="muted.500">
          Total Harga {qty > 1 && `(x${qty})`}
        </Text>
        <Heading size="md">{currencyFormat(totalPrice.price)}</Heading>
      </HStack>
      <Separator height={1} my={2} bg="gray.100" />
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <HStack flex={1} space={3} alignItems="center">
          <TouchableOpacity onPress={handleMinQty}>
            <Center
              px={1}
              py={2}
              borderWidth={1}
              borderColor="gray.300"
              borderRadius="lg">
              <Icon as={<Ionicons name="remove" />} size={6} />
            </Center>
          </TouchableOpacity>
          <Heading size="md">{qty}</Heading>
          <TouchableOpacity onPress={handleAddQty}>
            <Center
              px={1}
              py={2}
              borderWidth={1}
              borderColor="gray.300"
              borderRadius="lg">
              <Icon as={<Ionicons name="add" />} size={6} />
            </Center>
          </TouchableOpacity>
        </HStack>
        <HStack reversed space={4} alignItems="center">
          <Button
            px={4}
            py={3}
            borderRadius="lg"
            onPress={handleAddToCart}
            textTransform="none">
            {!cart ? 'Tambah ke Keranjang' : 'Perbaruhi Keranjang'}
          </Button>
          {cart && (
            <TouchableOpacity
              onPress={() => handleDeleteCart(Number(menu?.id!!))}>
              <Icon as={<Ionicons name="trash-outline" />} size={6} />
            </TouchableOpacity>
          )}
        </HStack>
      </HStack>
    </VStack>
  );
};
