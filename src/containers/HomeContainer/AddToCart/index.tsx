import React, {useEffect, useRef, useState} from 'react';
import {
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Spinner,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import {useNavigation, useRoute} from '@react-navigation/native';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ripple, Separator} from 'components';
import {CartItem, Extras, Merchant} from 'models/merchant.model';
import {MenuItem} from 'models/menu.model';
import {currencyFormat} from 'utils';

import {Footer} from './Footer';
import {Variant} from './Variant';

type Props = {};

const AddToCart: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const {merchant, menu, cart} = route.params as {
    merchant: Merchant;
    menu: MenuItem;
    cart?: CartItem;
  };

  const [note, setNote] = useState<string>(cart?.note || '');
  const [extras, setExtras] = useState<Extras[]>(cart?.extras || []);
  const [showVariants, setShowVariants] = useState<boolean>(false);
  const discountPrice = useRef<number>(0);

  const handleNoteChange = (value: string) => setNote(value);

  useEffect(() => {
    discountPrice.current = menu.discount
      ? (menu.price / 100) * menu.discount
      : 0;
    setTimeout(() => setShowVariants(true), 1000);
  }, [menu]);

  return (
    <>
      <HStack position="absolute" top={4} left={4} zIndex={999} width={'100%'}>
        <Ripple
          borderRadius={100}
          bg="white"
          shadow={2}
          borderColor="muted.100"
          borderWidth={1}
          onPress={() => navigation.goBack()}>
          <Center p={2}>
            <Icon as={<MIcons name="close" />} size={6} />
          </Center>
        </Ripple>
      </HStack>

      <ScrollView bg="white">
        <VStack space={1}>
          <Image
            source={{uri: menu.image}}
            alt={menu.name}
            width={'100%'}
            height={250}
          />
          <VStack space={1} mx={4} my={4}>
            <Heading size="lg">{menu.name}</Heading>
            <HStack space={2} alignItems="center">
              <Heading size="sm">
                {currencyFormat(menu.price - discountPrice.current)}
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
          {showVariants ? (
            menu.variants && (
              <>
                <Variant
                  cart={cart}
                  variants={menu.variants}
                  extras={extras}
                  setExtras={setExtras}
                />
                <Separator height={3} bg="gray.100" />
              </>
            )
          ) : (
            <Spinner mt={5} />
          )}
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
        merchantId={merchant.id}
        cart={cart}
        menu={menu}
        extras={extras}
        note={note}
      />
    </>
  );
};

export default AddToCart;
