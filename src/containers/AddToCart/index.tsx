import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  TextArea,
  VStack,
  ZStack,
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Separator} from 'components';
import {ExtrasType} from 'models/merchantType';
import {AddToCartScreenProps} from 'navigation/types';
import {currencyFormat} from 'utils';

import {Footer} from './Footer';
import {Variant} from './Variant';

type Props = {} & AddToCartScreenProps;

const AddToCart: React.FC<Props> = ({navigation, route}) => {
  const {merchantId, menu, cart} = route.params;

  const [note, setNote] = useState<string>(cart?.note || '');
  const [extras, setExtras] = useState<ExtrasType[]>(cart?.extras || []);

  const handleNoteChange = (value: string) => setNote(value);

  const discountPrice = menu.discount ? (menu.price / 100) * menu.discount : 0;

  return (
    <>
      <ScrollView bg="white">
        <VStack space={1}>
          <ZStack height={250} width={'100%'}>
            <Image
              source={{uri: menu.image}}
              alt={menu.name}
              width={'100%'}
              height={250}
            />
            <HStack justifyContent="flex-end" width={'100%'} p={4}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Center borderRadius={100} bg="white" p={2}>
                  <Icon as={<Ionicons name="close" />} size={6} />
                </Center>
              </TouchableOpacity>
            </HStack>
          </ZStack>
          <VStack space={1} mx={4} my={4}>
            <Heading size="lg">{menu.name}</Heading>
            <HStack space={2} alignItems="center">
              <Heading size="sm">
                {currencyFormat(menu.price - discountPrice)}
              </Heading>
              {menu.discount && (
                <Text
                  fontSize="sm"
                  color="red.600"
                  borderColor="red.600"
                  borderWidth={1}
                  px={1}>
                  Diskon {menu.discount}%
                </Text>
              )}
            </HStack>
            {menu.description && (
              <Text color="muted.500" fontSize="sm" lineHeight={5} mt={1}>
                {menu.description}
              </Text>
            )}
          </VStack>
          <Separator height={3} bg="gray.100" />
          {menu.variants && (
            <Variant
              cart={cart}
              variants={menu.variants}
              extras={extras}
              setExtras={setExtras}
            />
          )}
          {menu.variants && <Separator height={3} bg="gray.100" />}
          <TextArea
            m={4}
            size="sm"
            variant="filled"
            value={note}
            onChangeText={handleNoteChange}
            placeholder="Instruksi tambahan, misal: Cabenya dikit aja bang"
            textAlignVertical="top"
            bg="gray.100"
          />
        </VStack>
      </ScrollView>
      <Footer
        navigation={navigation}
        route={route}
        merchantId={merchantId}
        cart={cart}
        menu={menu}
        extras={extras}
        note={note}
      />
    </>
  );
};

export default AddToCart;
