import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Radio,
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
import {currencyFormat} from 'utils';

import {Footer} from './Footer';
import {Loader} from './Loader';
import {resetSelectedMenu} from 'stores/merchant';

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
  const radioGroupRef = useRef<any>([]);

  useEffect(() => {
    setNote(cart?.note || '');
    setExtras(cart?.extras || []);

    return () => {
      setNote('');
      setExtras([]);
    };
  }, [cart]);

  const handleOnClose = () => {
    dispatch(resetSelectedMenu());
  };

  const handleNoteChange = (value: string) => setNote(value);

  const handleOptionChange = (value: string) => {
    const strArr = value.split('-');
    const groupId = strArr[0];
    const itemId = strArr[1];
    const price = strArr[2];

    const newExtras = extras?.filter(item => item.groupId !== groupId)!!;
    setExtras([
      ...newExtras,
      {
        groupId,
        itemId,
        price,
      },
    ]);
  };

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
                <VStack space={2} m={4}>
                  {menu.variants?.map((variant, index) => (
                    <VStack space={2} key={variant.id}>
                      <Heading size="sm">{variant.name}</Heading>
                      <Radio.Group
                        ref={(el: any) =>
                          (radioGroupRef.current[variant.id] = el)
                        }
                        defaultValue={`${cart?.extras[index].groupId}-${
                          cart?.extras[index].itemId
                        }-${(cart?.extras[index].price || 0).toString()}`}
                        name={variant.id.toString()}
                        onChange={handleOptionChange}>
                        {variant.item.map(item => (
                          <Radio
                            key={item.id}
                            value={`${variant.id}-${item.id.toString()}-${(
                              item.price || 0
                            ).toString()}`}
                            colorScheme="red"
                            my={1}
                            accessibilityLabel={item.name}
                            pl={1}>
                            <HStack
                              justifyContent="space-between"
                              width={'100%'}
                              pr={5}
                              pl={2}>
                              <Text fontSize="sm">{item.name}</Text>
                              <Text fontSize="sm">
                                {item.price
                                  ? `+ ${currencyFormat(item.price)}`
                                  : ''}
                              </Text>
                            </HStack>
                          </Radio>
                        ))}
                      </Radio.Group>
                    </VStack>
                  ))}
                </VStack>
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
