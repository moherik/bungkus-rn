import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Box, Center, Heading, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {currencyFormat} from 'utils';
import {Separator} from 'components';
import {useAppDispatch, useAppSelector} from 'hooks';
import {addToCart, deleteCart, updateCart} from 'stores/merchant';
import {CartItemType, ExtrasType} from 'models/merchantType';

export type ExtraPriceType = {
  item: number;
  total: number;
};

type Props = {
  extras?: ExtrasType[];
  price: number;
  note?: string;
  discount?: number;
  closeModal: () => void;
};

export const Footer = ({price, discount, extras, note, closeModal}: Props) => {
  const dispatch = useAppDispatch();
  const merchantId = useAppSelector(
    state => state.merchant.selectedMerchant?.id,
  );
  const menu = useAppSelector(state => state.merchant.selectedMenu);
  const cart = useAppSelector(state => state.merchant.selectedCartMenu);
  const [qty, setQty] = useState<number>(1);
  const [extraPrice, setExtraPrice] = useState<ExtraPriceType | null>(null);

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

    setQty(cart?.qty || 1);
    setExtraPrice({item: totalItem || 0, total: totalExtraPrice || 0});

    return () => {
      setQty(1);
      setExtraPrice({item: 0, total: 0});
    };
  }, [extras, cart]);

  const handleAddQty = () => setQty(qty + 1);

  const handleMinQty = () => qty !== 1 && setQty(qty - 1);

  const priceAfterDiscount = discount ? (price / 100) * discount : null;
  let totalPrice = priceAfterDiscount
    ? price * qty - priceAfterDiscount
    : price * qty;

  if (extraPrice != null) {
    totalPrice = totalPrice + extraPrice.total;
  }

  const handleAddToCart = () => {
    const data: CartItemType = {
      merchantId: merchantId!!,
      menuId: Number(menu?.id!!),
      menuName: menu?.name!!,
      qty,
      price: totalPrice,
      discount: discount || 0,
      note: note || '',
      extras: extras || [],
    };

    if (!cart) {
      dispatch(addToCart(data));
    } else {
      dispatch(updateCart(data));
    }

    closeModal();
  };

  const handleDeleteCart = (id: number) => {
    closeModal();
    dispatch(deleteCart(id));
  };

  return (
    <VStack shadow={4} py={2} bg="white">
      {priceAfterDiscount && (
        <HStack justifyContent="space-between" alignItems="center" px={4}>
          <Text fontSize="sm" color="gray.500">
            Diskon
          </Text>
          <Heading size="xs" color="red.600">
            {currencyFormat(priceAfterDiscount, '-Rp. ')}
          </Heading>
        </HStack>
      )}
      {extraPrice && extraPrice.total > 0 && (
        <HStack justifyContent="space-between" alignItems="center" px={4}>
          <Text fontSize="sm" color="gray.500">
            Ekstra (x{extraPrice.item})
          </Text>
          <Heading size="xs">{currencyFormat(extraPrice.total)}</Heading>
        </HStack>
      )}
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Text fontSize="sm" color="gray.500">
          Total Harga {qty > 1 && `(x${qty})`}
        </Text>
        <Heading size="md">{currencyFormat(totalPrice)}</Heading>
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
