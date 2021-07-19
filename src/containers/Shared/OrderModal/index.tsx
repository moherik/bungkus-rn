import React, {forwardRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
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
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

import {Separator} from 'components';
import {CartItemType, ExtrasType} from 'models/merchantType';
import {MenuItemType} from 'models/menuType';

import {Footer} from './Footer';
import {Variant} from './Variant';

type Props = {
  merchantId: number;
  menu: MenuItemType;
  cart?: CartItemType;
  closeModal: () => void;
};

export const OrderModal = forwardRef<Modalize, Props>(
  ({merchantId, menu, cart, closeModal}, ref) => {
    const [note, setNote] = useState<string>(cart?.note || '');
    const [extras, setExtras] = useState<ExtrasType[]>(cart?.extras || []);

    const handleNoteChange = (value: string) => setNote(value);

    return (
      <Portal>
        <Modalize
          ref={ref}
          modalStyle={styles.modal}
          FooterComponent={
            <Footer
              merchantId={merchantId}
              cart={cart!!}
              menu={menu}
              extras={extras}
              note={note}
              closeModal={closeModal}
            />
          }>
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
                  <TouchableOpacity onPress={closeModal}>
                    <Center borderRadius={100} bg="white" p={2}>
                      <Icon as={<Ionicons name="close" />} size={6} />
                    </Center>
                  </TouchableOpacity>
                </HStack>
              </ZStack>
              <VStack space={1} mx={4} my={4}>
                <Heading size="lg">{menu.name}</Heading>
                {menu.description && (
                  <Text color="gray.500" fontSize="sm" lineHeight={5}>
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
                variant="filled"
                value={note}
                onChangeText={handleNoteChange}
                placeholder="Instruksi tambahan, misal: Cabenya dikit aja bang"
                textAlignVertical="top"
                bg="gray.100"
              />
            </VStack>
          </ScrollView>
        </Modalize>
      </Portal>
    );
  },
);

const styles = StyleSheet.create({
  modal: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
