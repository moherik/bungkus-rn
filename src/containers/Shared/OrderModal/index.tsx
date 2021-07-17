import React, {forwardRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Heading, Image, ScrollView, Text, TextArea, VStack} from 'native-base';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';

import {useAppDispatch, useAppSelector} from 'hooks';
import {Separator} from 'components';
import {resetSelectedMenu} from 'stores/merchant';

import {Footer} from './Footer';
import {Loader} from './Loader';

type Props = {};

export const OrderModal = forwardRef<Modalize, Props>((props, ref) => {
  const [order, setOrder] = useState<number>(1);
  const [note, setNote] = useState<string>();
  const menu = useAppSelector(state => state.merchant.selectedMenu);
  const dispatch = useAppDispatch();

  const handleOnCloseModal = () => {
    dispatch(resetSelectedMenu());
    setOrder(1);
  };

  const handleOnNoteChange = (e: any) => setNote(e.target.value);

  const handleAddOrder = () => setOrder(order + 1);

  const handleMinOrder = () => order !== 1 && setOrder(order - 1);

  return (
    <Portal>
      <Modalize
        ref={ref}
        onClose={handleOnCloseModal}
        modalStyle={styles.modal}
        FooterComponent={
          menu && (
            <Footer
              price={menu.price}
              order={order}
              handleAddOrder={handleAddOrder}
              handleMinOrder={handleMinOrder}
            />
          )
        }>
        {menu ? (
          <ScrollView>
            <VStack space={1}>
              <Image
                source={{uri: menu.image}}
                alt={menu.name}
                width={'100%'}
                height={250}
              />
              <VStack space={1} mx={4} my={4}>
                <Heading size="lg">{menu.name}</Heading>
                {menu.description && (
                  <Text color="gray.500">{menu.description}</Text>
                )}
              </VStack>
              <Separator height={3} bg="gray.100" />
              <TextArea
                m={4}
                variant="filled"
                value={note}
                placeholder="Instruksi tambahan, misal: Cabenya dikit aja bang"
                onChange={handleOnNoteChange}
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
