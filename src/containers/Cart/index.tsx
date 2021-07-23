import React, {useState} from 'react';
import {
  Box,
  Center,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CartScreenProps} from 'navigation/types';
import {currencyFormat} from 'utils';
import {useAppDispatch, useAppSelector} from 'hooks';
import {deleteCart} from 'stores/merchant';
import {TouchableOpacity} from 'react-native';

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
    <HStack space={2} alignItems="center">
      {icon && <Icon as={<Ionicons name={icon} />} size={6} />}
      <Heading size="sm">{label}</Heading>
    </HStack>
    {rightComponent}
  </HStack>
);

type Props = {} & CartScreenProps;

const CartContainer: React.FC<Props> = ({navigation, route}) => {
  const {merchant} = route.params;
  const carts = useAppSelector(state => state.merchant.selectedCarts);
  const price = carts.reduce((acc, cart) => acc + cart.price, 0);
  const dispatch = useAppDispatch();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [orderTime, setOrderTime] = useState<string>('');
  const [orderNote, setOrderNote] = useState<string>('');

  const handleAddNew = () => navigation.goBack();

  const handleDeleteById = (id: number) => dispatch(deleteCart(id));

  return (
    <>
      <HStack bg="white" alignItems="center" px={4} py={3} shadow={2} space={4}>
        <Icon
          as={<Ionicons name="close-outline" />}
          size={8}
          onPress={() => navigation.goBack()}
        />
        <Heading size="md">{merchant.name}</Heading>
      </HStack>

      <ScrollView bg="white">
        <VStack>
          <Separator label="Metode Pemesanan" icon="bicycle-outline" />
          <Radio.Group
            px={4}
            py={2}
            name="orderType"
            value={orderType}
            onChange={(value: any) => {
              setOrderType(value);
            }}>
            <Radio value="pickup" my={1} accessibilityLabel="pickup">
              Ambil Sendiri
            </Radio>
            <Radio
              value="delivery"
              isDisabled
              my={1}
              accessibilityLabel="delivery">
              <HStack ml={2} space={4} alignItems="center">
                <Text>Pesan Antar</Text>
                <Text fontSize="sm" color="muted.500">
                  Belum tersedia untuk saat ini
                </Text>
              </HStack>
            </Radio>
          </Radio.Group>

          <Separator
            label="Daftar Pesanan"
            icon="cart-outline"
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
                const name: string[] = extra.items.map(item => item.itemName);
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
                      <Pressable onPress={() => handleDeleteById(cart.menuId)}>
                        <Text fontSize="sm" color="red.600" fontWeight={700}>
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

          <Separator label="Waktu Pengambilan" icon="time-outline" />
          <Radio.Group
            px={4}
            py={2}
            name="orderTime"
            defaultValue="asap"
            value={orderTime}
            onChange={(value: any) => {
              setOrderTime(value);
            }}>
            <Radio value="asap" my={1} accessibilityLabel="asap">
              Secepatnya
            </Radio>
            <Radio value="schedule" my={1} accessibilityLabel="schedule">
              Jadwalkan
            </Radio>
          </Radio.Group>

          <Separator label="Catatan Pemesanan" icon="create-outline" />
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
        <Box py={2} px={4}>
          <TouchableOpacity onPress={() => {}}>
            <Center bg="red.600" p={4} borderRadius="lg">
              <Text color="white" fontWeight={700} textTransform="uppercase">
                Pesan Sekarang
              </Text>
            </Center>
          </TouchableOpacity>
        </Box>
      </VStack>
    </>
  );
};

export default CartContainer;
