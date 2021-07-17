import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Center, Heading, HStack, Icon, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {currencyFormat} from 'utils';
import {Separator} from 'components';

type Props = {
  price: number;
  order: number;
  handleMinOrder: () => void;
  handleAddOrder: () => void;
};

export const Footer = ({
  price,
  order,
  handleAddOrder,
  handleMinOrder,
}: Props) => (
  <VStack shadow={4} py={2} bg="white">
    <HStack justifyContent="space-between" alignItems="center" px={4}>
      <Text fontSize="sm" color="gray.500">
        Total Harga
      </Text>
      <Heading size="md">{currencyFormat(price * order)}</Heading>
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
      <TouchableOpacity onPress={() => {}}>
        <Center bg="red.600" px={4} py={3} borderRadius="lg">
          <Text color="white" fontWeight={700}>
            Tambah Ke Keranjang
          </Text>
        </Center>
      </TouchableOpacity>
    </HStack>
  </VStack>
);
