import React from 'react';
import {
  Icon,
  ScrollView,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
} from 'native-base';
import {CompleteScreenProps} from 'navigation/types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Button} from 'components';

type Props = {} & CompleteScreenProps;

const CompleteUserContainer: React.FC<Props> = ({navigation, route}) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleCompleteData = () => {};

  return (
    <>
      <HStack
        bg="white"
        alignItems="center"
        justifyContent="flex-start"
        space={4}
        p={4}
        shadow={2}>
        <Icon
          onPress={handleGoBack}
          as={<Ionicons name="arrow-back-outline" />}
          size={6}
        />
        <Heading size="md">Lengkapi Data</Heading>
      </HStack>
      <ScrollView flex={1} bg="white" p={4}>
        <VStack space={4}>
          <Text color="muted.500" mb={4} lineHeight={6}>
            Untuk melanjutkan proses signin, lengkapi data nama kamu, agar
            penjual bisa mengetahui identitasmu.
          </Text>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="sm">No. Telepon</Heading>
            <Text>{`+62${route.params.phone}`}</Text>
          </HStack>
          <VStack space={2}>
            <Text color="muted.500">Masukan nama lengkap kamu</Text>
            <Input placeholder="Nama Kamu" size="lg" variant="filled" />
          </VStack>
          <Button onPress={handleCompleteData} py={4} borderRadius="md">
            Simpan
          </Button>
        </VStack>
      </ScrollView>
    </>
  );
};

export default CompleteUserContainer;
