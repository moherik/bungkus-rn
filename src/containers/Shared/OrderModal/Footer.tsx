import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, Heading, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {currencyFormat} from 'utils';
import {Separator} from 'components';
import {useAppDispatch, useAppSelector} from 'hooks';
import {addToCart} from 'stores/merchant';
import {ExtrasType} from 'models/merchantType';

export type ExtraPriceType = {
  item: number;
  total: number;
};

type Props = {
  extras: ExtrasType[];
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
  const [order, setOrder] = useState<number>(1);
  const [extraPrice, setExtraPrice] = useState<ExtraPriceType | null>(null);

  useEffect(() => {
    const totalExtraPrice = extras.reduce(
      (acc, value) => Number(value.price) + acc,
      0,
    );

    setExtraPrice({item: extras.length, total: totalExtraPrice});

    return () => {};
  }, [extras]);

  const handleAddOrder = () => setOrder(order + 1);

  const handleMinOrder = () => order !== 1 && setOrder(order - 1);

  const priceAfterDiscount = discount ? (price / 100) * discount : null;
  let totalPrice = priceAfterDiscount
    ? price * order - priceAfterDiscount
    : price * order;

  if (extraPrice != null) {
    totalPrice = totalPrice + extraPrice.total;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        merchantId: merchantId!!,
        menuId: Number(menu?.id!!),
        menuName: menu?.name!!,
        qty: order,
        price: totalPrice,
        discount: discount || 0,
        note: note || '',
        extras,
      }),
    );

    closeModal();
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
      {extraPrice && extraPrice.item !== 0 && (
        <HStack justifyContent="space-between" alignItems="center" px={4}>
          <Text fontSize="sm" color="gray.500">
            Extra (x{extraPrice.item})
          </Text>
          <Heading size="xs">{currencyFormat(extraPrice.total)}</Heading>
        </HStack>
      )}
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <Text fontSize="sm" color="gray.500">
          Total Harga {order > 1 && `(x${order})`}
        </Text>
        <Heading size="md">{currencyFormat(totalPrice)}</Heading>
      </HStack>
      <Separator height={1} my={2} bg="gray.100" />
      <HStack justifyContent="space-between" alignItems="center" px={4}>
        <HStack flex={1} space={2} alignItems="center">
          <TouchableOpacity onPress={handleMinOrder}>
            <Center
              px={1}
              py={2}
              borderWidth={1}
              borderColor="gray.300"
              borderRadius="lg">
              <Icon as={<Ionicons name="remove" />} size={6} />
            </Center>
          </TouchableOpacity>
          <Heading size="md" px={2}>
            {order}
          </Heading>
          <TouchableOpacity onPress={handleAddOrder}>
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
        <TouchableOpacity onPress={handleAddToCart}>
          <Center bg="red.600" px={4} py={3} borderRadius="lg">
            <Text color="white" fontWeight={700}>
              Tambah Ke Keranjang
            </Text>
          </Center>
        </TouchableOpacity>
      </HStack>
    </VStack>
  );
};
