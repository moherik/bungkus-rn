import React, {useEffect, useState} from 'react';
import {
  Center,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
  AlertDialog,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {currencyFormat} from 'utils';
import {Separator, Button, Ripple} from 'components';
import {useAppDispatch} from 'hooks';
import {addToCart, deleteCart, updateCart} from 'stores/merchant.store';
import {CartItem, Extras} from 'models/merchant.model';
import {MenuItem} from 'models/menu.model';

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
};

export const Footer = ({merchantId, cart, menu, extras, note}: Props) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(true);
  const cancelRef = React.useRef();

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

    setTimeout(() => setLoading(false), 1000);

    return () => {
      setTotalPrice({
        price: 0,
        discount: 0,
        extras: 0,
      });
    };
  }, [extras, cart, menu.discount, menu.price, qty]);

  const onCloseAlert = () => setIsOpen(false);

  const handleAddQty = () => setQty(qty + 1);

  const handleMinQty = () => {
    if (qty !== 1) {
      setQty(qty - 1);
    } else if (cart) {
      handleConfirmDelete();
    }
  };

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

  const handleConfirmDelete = () => setIsOpen(true);

  const handleDeleteCart = () => {
    dispatch(deleteCart(cart?.id!!));

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
          <Ripple
            onPress={handleMinQty}
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300">
            <Center px={1} py={2}>
              <Icon as={<MIcons name="minus" />} size={6} />
            </Center>
          </Ripple>
          <Heading size="md">{qty}</Heading>
          <Ripple
            onPress={handleAddQty}
            borderRadius="lg"
            borderWidth={1}
            borderColor="gray.300">
            <Center px={1} py={2}>
              <Icon as={<MIcons name="plus" />} size={6} />
            </Center>
          </Ripple>
        </HStack>
        <HStack reversed space={2} alignItems="center">
          <Button
            disabled={loading}
            px={4}
            py={3}
            borderRadius="lg"
            onPress={handleAddToCart}
            textTransform="none">
            {!cart ? 'Tambah ke Keranjang' : 'Perbaruhi Keranjang'}
          </Button>
          {cart && (
            <Ripple borderRadius={100} onPress={handleConfirmDelete}>
              <Center p={2}>
                <Icon as={<MIcons name="trash-can-outline" />} size={6} />
              </Center>
            </Ripple>
          )}
        </HStack>
      </HStack>

      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onCloseAlert}>
        <AlertDialog.Content p={0}>
          <AlertDialog.Header px={4} mt={4}>
            Hapus item ini?
          </AlertDialog.Header>
          <AlertDialog.Body px={4}>
            Hapus item ini dari keranjang kamu.
          </AlertDialog.Body>
          <AlertDialog.Footer
            p={4}
            mx={0}
            borderTopWidth={1}
            borderTopColor="gray.100">
            <Button
              px={4}
              py={2}
              bgColor="white"
              borderRadius="lg"
              color="black"
              fontWeight="600"
              textTransform="none"
              onPress={onCloseAlert}>
              Batal
            </Button>
            <Button
              bgColor="red.600"
              px={4}
              py={2}
              textTransform="none"
              borderRadius="lg"
              onPress={handleDeleteCart}
              ml={3}>
              Hapus
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </VStack>
  );
};
