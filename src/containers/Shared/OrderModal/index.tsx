import React, {forwardRef, useEffect, useState} from 'react';
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

import {useAppDispatch, useAppSelector} from 'hooks';
import {Separator} from 'components';
import {ExtrasType} from 'models/merchantType';
import {resetSelectedMenu} from 'stores/merchant';

import {Footer} from './Footer';
import {Loader} from './Loader';
import {Variant} from './Variant';

type Props = {
  merchantId: number;
  closeModal: () => void;
};

export const OrderModal = forwardRef<Modalize, Props>((props, ref) => {
  const menu = useAppSelector(state => state.merchant.selectedMenu);
  const cart = useAppSelector(state => state.merchant.selectedCartMenu);
  const dispatch = useAppDispatch();

  const [note, setNote] = useState<string>();
  const [extras, setExtras] = useState<ExtrasType[]>();

  useEffect(() => {
    setNote(cart?.note || '');
    setExtras(cart?.extras || []);

    return () => {
      setNote('');
      setExtras([]);
    };
  }, [cart]);

  const handleOnClose = () => {
    setExtras([]);
    dispatch(resetSelectedMenu());
  };

  const handleNoteChange = (value: string) => setNote(value);

  return (
    <Portal>
      <Modalize
        ref={ref}
        onClose={handleOnClose}
        modalStyle={styles.modal}
        FooterComponent={
          menu && (
            <Footer
              discount={menu.discount}
              price={menu.price}
              extras={extras}
              note={note}
              closeModal={props.closeModal}
            />
          )
        }>
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
                  <Text color="gray.500" fontSize="sm" lineHeight={5}>
                    {menu.description}
                  </Text>
                )}
              </VStack>
              <Separator height={3} bg="gray.100" />
              {menu.variants && (
                <Variant
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
