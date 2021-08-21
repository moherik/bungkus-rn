import React, {useState} from 'react';
import {
  Icon,
  ScrollView,
  Heading,
  HStack,
  Input,
  VStack,
  Text,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useUpdateNameMutation} from 'services/user.service';

import {Button, LoadingModal} from 'components';
import {useAppDispatch} from 'hooks';
import {setToken} from 'stores/auth.store';
import {CompleteScreenProps} from 'navigation/AuthStack';

type Props = {} & CompleteScreenProps;

const CompleteUserContainer: React.FC<Props> = ({navigation, route}) => {
  const dispatch = useAppDispatch();

  const {phone, jwtToken: token} = route.params;
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [updateName] = useUpdateNameMutation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleChangeName = (value: string) => setName(value);

  const handleCompleteData = () => {
    setLoading(true);
    updateName({name, token})
      .unwrap()
      .then(_fulfilled => {
        dispatch(setToken(token));
      })
      .catch(rejected => console.log(rejected))
      .finally(() => setLoading(false));
  };

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
            <Text>{`+62${phone}`}</Text>
          </HStack>
          <VStack space={2}>
            <Text color="muted.500">Masukan nama lengkap kamu</Text>
            <Input
              placeholder="Nama Kamu"
              size="lg"
              variant="filled"
              value={name}
              onChangeText={handleChangeName}
            />
          </VStack>
          <Button onPress={handleCompleteData} py={4} borderRadius="lg">
            Perbaruhi
          </Button>
        </VStack>
      </ScrollView>
      <LoadingModal loading={loading} />
    </>
  );
};

export default CompleteUserContainer;
