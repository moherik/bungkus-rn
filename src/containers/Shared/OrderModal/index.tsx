import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Radio,
  ScrollView,
  Text,
  TextArea,
  VStack,
  ZStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

import {useAppDispatch, useAppSelector} from 'hooks';
import {Separator} from 'components';
import {CartItemType, ExtrasType} from 'models/merchantType';
import {currencyFormat} from 'utils';

import {Loader} from './Loader';
import {addToCart, resetSelectedMenu} from 'stores/merchant';

type ExtraPriceType = {
  item: number;
  total: number;
};

type Props = {
  merchantId: number;
  closeModal: () => void;
};

export const OrderModal = forwardRef<Modalize, Props>((props, ref) => {
  const menu = useAppSelector(state => state.merchant.selectedMenu);
  const cart = useAppSelector(state => state.merchant.selectedCartMenu);
  const dispatch = useAppDispatch();

  const [note, setNote] = useState<string>(cart?.note || '');
  const [extras, setExtras] = useState<ExtrasType[]>(cart?.extras || []);
  const [order, setOrder] = useState<number>(cart?.qty || 1);
  const [extraPrice, setExtraPrice] = useState<ExtraPriceType | null>(null);
  const radioGroupRef = useRef<any>([]);

  useEffect(() => {
    const totalExtraPrice = extras.reduce(
      (acc, value) => Number(value.price) + acc,
      0,
    );

    setExtraPrice({item: extras.length, total: totalExtraPrice});

    return () => {};
  }, [extras]);

  const handleOnClose = () => {
    setExtras([]);
    dispatch(resetSelectedMenu());
  };

  const handleNoteChange = (value: string) => setNote(value);

  const handleOptionChange = (value: string) => {
    const strArr = value.split('-');
    const groupId = strArr[0];
    const price = strArr[2];

    const newExtras = extras.filter(item => item.id !== groupId);
    if (Number(price) !== 0) {
      setExtras([
        ...newExtras,
        {
          id: groupId,
          price: price,
        },
      ]);
    } else {
      setExtras(newExtras);
    }
  };

  const handleAddOrder = () => setOrder(order + 1);

  const handleMinOrder = () => order !== 1 && setOrder(order - 1);

  const handleAddToCart = (item: CartItemType) => {
    dispatch(addToCart(item));
    props.closeModal();
  };

  return (
    <Portal>
      <Modalize
        ref={ref}
        onClose={handleOnClose}
        modalStyle={styles.modal}
        FooterComponent={() => {
          if (menu) {
            const priceAfterDiscount = menu.discount
              ? (menu.price / 100) * menu.discount
              : null;

            let totalPrice = priceAfterDiscount
              ? menu.price * order - priceAfterDiscount
              : menu.price * order;

            if (extraPrice != null) {
              totalPrice = totalPrice + extraPrice.total;
            }

            return (
              <VStack shadow={4} py={2} bg="white">
                {priceAfterDiscount && (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    px={4}>
                    <Text fontSize="sm" color="gray.500">
                      Diskon
                    </Text>
                    <Heading size="xs" color="red.600">
                      {currencyFormat(priceAfterDiscount, '-Rp. ')}
                    </Heading>
                  </HStack>
                )}
                {extraPrice && extraPrice.item !== 0 && (
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    px={4}>
                    <Text fontSize="sm" color="gray.500">
                      Extra (x{extraPrice.item})
                    </Text>
                    <Heading size="xs">
                      {currencyFormat(extraPrice.total)}
                    </Heading>
                  </HStack>
                )}
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  px={4}>
                  <Text fontSize="sm" color="gray.500">
                    Total Harga {order > 1 && `(x${order})`}
                  </Text>
                  <Heading size="md">{currencyFormat(totalPrice)}</Heading>
                </HStack>
                <Separator height={1} my={2} bg="gray.100" />
                <HStack
                  justifyContent="space-between"
                  alignItems="center"
                  px={4}>
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
                  <TouchableOpacity
                    onPress={() =>
                      handleAddToCart({
                        merchantId: props.merchantId,
                        menuId: Number(menu.id),
                        menuName: menu.name,
                        qty: order,
                        price: totalPrice,
                        discount: menu.discount || 0,
                        note: note || '',
                        extras,
                      })
                    }>
                    <Center bg="red.600" px={4} py={3} borderRadius="lg">
                      <Text color="white" fontWeight={700}>
                        {cart ? 'Perbaruhi Keranjang' : 'Tambah Ke Keranjang'}
                      </Text>
                    </Center>
                  </TouchableOpacity>
                </HStack>
              </VStack>
            );
          }
        }}>
        {menu ? (
          <ScrollView>
            <VStack space={1}>
              <ZStack height={250} width={'100%'}>
                <Image
                  source={{uri: menu.image}}
                  alt={menu.name}
                  width={'100%'}
                  height={250}
                />
                <HStack justifyContent="flex-end" width={'100%'} p={4}>
                  <TouchableOpacity onPress={props.closeModal}>
                    <Center borderRadius={100} bg="white" p={2}>
                      <Icon as={<Ionicons name="close" />} size={6} />
                    </Center>
                  </TouchableOpacity>
                </HStack>
              </ZStack>
              <VStack space={1} mx={4} my={4}>
                <Heading size="lg">{menu.name}</Heading>
                {menu.description && (
                  <Text color="gray.500">{menu.description}</Text>
                )}
              </VStack>
              <Separator height={3} bg="gray.100" />
              {menu.variants && (
                <VStack space={2} m={4}>
                  {menu.variants?.map(variant => (
                    <VStack space={2} key={variant.id}>
                      <Heading size="sm">{variant.name}</Heading>
                      <Radio.Group
                        ref={(el: any) =>
                          (radioGroupRef.current[variant.id] = el)
                        }
                        name={variant.id.toString()}
                        onChange={handleOptionChange}>
                        {variant.item.map(item => (
                          <Radio
                            key={item.id}
                            value={`${variant.id}-${item.id.toString()}-${(
                              item.price || 0
                            ).toString()}`}
                            colorScheme="red"
                            my={1}
                            accessibilityLabel={item.name}
                            pl={1}>
                            <HStack
                              justifyContent="space-between"
                              width={'100%'}
                              pr={5}
                              pl={2}>
                              <Text fontSize="sm">{item.name}</Text>
                              <Text fontSize="sm">
                                {item.price ? currencyFormat(item.price) : ''}
                              </Text>
                            </HStack>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </VStack>
                  ))}
                </VStack>
              )}
              {menu.variants && <Separator height={3} bg="gray.100" />}
              <TextArea
                m={4}
                variant="filled"
                value={note}
                onChangeText={handleNoteChange}
                placeholder="Instruksi tambahan, misal: Cabenya dikit aja bang"
                textAlignVertical="top"
                bg="gray.100"
              />
            </VStack>
          </ScrollView>
        ) : (
          <Loader />
        )}
      </Modalize>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modal: {borderTopLeftRadius: 0, borderTopRightRadius: 0},
});
