import React, {useEffect, useState} from 'react';
import {
  Box,
  Heading,
  HStack,
  Icon,
  Pressable,
  Radio,
  ScrollView,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Button, Ripple} from 'components';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

import {currencyFormat} from 'utils';
import {useAppDispatch, useAppSelector} from 'hooks';
import {deleteCart} from 'stores/merchant.store';
import {Loader} from './Loader';

type SeparatorProps = {
  label: string;
  icon?: string;
  rightComponent?: JSX.Element;
};

const Separator: React.FC<SeparatorProps> = ({label, icon, rightComponent}) => (
  <HStack
    alignItems="center"
    justifyContent="space-between"
    p={4}
    bg="muted.100">
    <HStack space={4} alignItems="center">
      {icon && <Icon as={<MIcons name={icon} />} size={6} />}
      <Heading size="sm">{label}</Heading>
    </HStack>
    {rightComponent}
  </HStack>
);

type Props = {};

const Checkout: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const params = useRoute().params as any;

  const [loading, setLoading] = useState<boolean>(true);

  const carts = useAppSelector(state => state.merchant.selectedCarts);
  const dispatch = useAppDispatch();

  const price = carts.reduce((acc, cart) => acc + cart.price, 0);
  useEffect(() => {
    if (carts && carts.length > 0) {
      setLoading(false);
    }
    return () => {};
  }, [carts]);

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [orderTime, setOrderTime] = useState<string>('asap');
  const [orderNote, setOrderNote] = useState<string>('');

  const handleAddNew = () => navigation.goBack();

  const handleDeleteById = (id: number) => dispatch(deleteCart(id));

  return (
    <Box bg="white" flex={1}>
      <HStack bg="white" alignItems="center" shadow={2}>
        <Ripple onPress={() => navigation.goBack()}>
          <Box p={3}>
            <Icon as={<MIcons name="close" />} size={7} />
          </Box>
        </Ripple>
        <Heading size="md">{params.merchant.name}</Heading>
      </HStack>

      {!loading ? (
        <>
          <ScrollView bg="white">
            <VStack>
              <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />

              <Separator
                label="Daftar Pesanan"
                icon="shopping-outline"
                rightComponent={
                  <Pressable onPress={handleAddNew}>
                    <Text fontSize="sm" fontWeight={700} color="blue.600">
                      Tambah Pesanan
                    </Text>
                  </Pressable>
                }
              />
              <Box py={2}>
                {carts.map((cart, index) => {
                  let listName: string[][] = [];

                  cart.extras.forEach(extra => {
                    const name: string[] = extra.items.map(
                      item => item.itemName,
                    );
                    listName.push(name);
                  });

                  const listNames = listName.join().split(',');

                  return (
                    <HStack
                      justifyContent="space-between"
                      key={index}
                      py={2}
                      px={4}
                      borderBottomWidth={index !== carts.length - 1 ? 1 : 0}
                      borderBottomColor="gray.100">
                      <HStack space={6}>
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
                          <Pressable
                            onPress={() => handleDeleteById(cart.menuId)}>
                            <Text
                              fontSize="sm"
                              color="red.600"
                              fontWeight={700}>
                              Hapus
                            </Text>
                          </Pressable>
                        </VStack>
                      </HStack>
                      <Text>{currencyFormat(cart.price)}</Text>
                    </HStack>
                  );
                })}
              </Box>

              <Separator label="Cara Pemesanan" icon="package-variant-closed" />
              <Radio.Group
                ml={5}
                px={4}
                py={2}
                colorScheme="red"
                name="orderType"
                value={orderType}
                onChange={(value: any) => {
                  setOrderType(value);
                }}>
                <Radio value="pickup" my={1} accessibilityLabel="pickup">
                  <Text ml={5} fontSize="sm" width={'100%'}>
                    Ambil Sendiri
                  </Text>
                </Radio>
                <Radio value="dinein" my={1} accessibilityLabel="asap">
                  <Text ml={5} fontSize="sm" width={'100%'}>
                    Makan Ditempat
                  </Text>
                </Radio>
                <Radio
                  value="delivery"
                  isDisabled
                  my={1}
                  accessibilityLabel="delivery">
                  <Text ml={5} fontSize="sm" color="muted.300" width={'100%'}>
                    Pesan Antar
                  </Text>
                </Radio>
              </Radio.Group>

              <Separator label="Waktu Pengambilan" icon="clock-outline" />
              <Radio.Group
                ml={5}
                px={4}
                py={2}
                colorScheme="red"
                name="orderTime"
                value={orderTime}
                onChange={(value: any) => {
                  setOrderTime(value);
                }}>
                <Radio value="asap" my={1} accessibilityLabel="asap">
                  <Text ml={5} fontSize="sm" width={'100%'}>
                    Ambil Sekarang
                  </Text>
                </Radio>
                <Radio value="schedule" my={1} accessibilityLabel="schedule">
                  <Text ml={5} fontSize="sm" width={'100%'}>
                    Pilih Waktu
                  </Text>
                </Radio>
              </Radio.Group>

              <Separator label="Catatan Pemesanan" icon="note-text-outline" />
              <TextArea
                bg="gray.100"
                m={4}
                size="sm"
                variant="filled"
                value={orderNote}
                onChangeText={text => setOrderNote(text)}
                placeholder="Catatan tambahan"
                textAlignVertical="top"
              />
            </VStack>
          </ScrollView>

          <VStack space={2} bg="white">
            <HStack
              alignItems="center"
              justifyContent="space-between"
              py={2}
              px={4}
              borderTopWidth={1}
              borderTopColor="gray.100"
              borderBottomWidth={1}
              borderBottomColor="gray.100">
              <Text fontSize="md">Total</Text>
              <Heading size="md">{currencyFormat(price)}</Heading>
            </HStack>

            <Button p={4} mx={4} mb={4} borderRadius="lg" onPress={() => {}}>
              Pesan Sekarang
            </Button>
          </VStack>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 200,
  },
});

export default Checkout;
