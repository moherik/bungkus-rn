import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Center, Heading, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {currencyFormat} from 'utils';
import {Separator} from 'components';
import {useAppDispatch} from 'hooks';
import {addToCart, deleteCart, updateCart} from 'stores/merchant';
import {CartItemType, ExtrasType} from 'models/merchantType';
import {MenuItemType} from 'models/menuType';

export type ExtraPriceType = {
  item: number;
  total: number;
};

type Props = {
  merchantId: number;
  cart: CartItemType;
  menu: MenuItemType;
  extras?: ExtrasType[];
  note?: string;
  closeModal: () => void;
};

export const Footer = ({
  merchantId,
  cart,
  menu,
  extras,
  note,
  closeModal,
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
    const data: CartItemType = {
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
      dispatch(updateCart({menuId: Number(menu.id), data}));
    }

    closeModal();
  };

  const handleDeleteCart = (id: number) => {
    closeModal();
    dispatch(deleteCart(id));
  };

  return (
    <VStack shadow={4} py={2} bg="white">
      {totalPrice.discount > 0 && (
        <HStack justifyContent="space-between" alignItems="center" px={4}>
          <Text fontSize="sm" color="gray.500">
            Diskon ({menu.discount}%)
          </Text>
          <Heading size="xs" color="red.600">
            {currencyFormat(totalPrice.discount, '-Rp. ')}
          </Heading>
        </HStack>
      )}
      {/* {totalPrice.extras > 0 && (
        <HStack justifyContent="space-between" alignItems="center" px={4}>
          <Text fontSize="sm" color="gray.500">
            Ekstra
          </Text>
          <Heading size="xs">{currencyFormat(totalPrice.extras)}</Heading>
        </HStack>
      )} */}
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
        <HStack reversed space={2} alignItems="center">
          <TouchableOpacity onPress={handleAddToCart}>
            <Center bg="red.600" px={4} py={3} borderRadius="lg">
              <Text color="white" fontWeight={700}>
                {!cart ? 'Tambah Ke Keranjang' : 'Perbaruhi Keranjang'}
              </Text>
            </Center>
          </TouchableOpacity>
          {cart && (
            <TouchableOpacity
              onPress={() => handleDeleteCart(Number(menu?.id!!))}>
              <Box>
                <Icon as={<Ionicons name="trash-outline" />} size={6} />
              </Box>
            </TouchableOpacity>
          )}
        </HStack>
      </HStack>
    </VStack>
  );
};
