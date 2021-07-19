import React, {forwardRef, useState} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import {Modalize} from 'react-native-modalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Portal} from 'react-native-portalize';

import {Rating, Separator} from 'components';
import {useAppDispatch, useAppSelector} from 'hooks';
import {reset} from 'stores/merchant';

import {Loader} from './Loader';
import {MenuList} from './MenuList';
import {currencyFormat} from 'utils';

const IMAGE_HEIGHT = 240;

type Props = {
  closeModal: () => void;
};

export const MenuModal = forwardRef<Modalize, Props>((props, ref) => {
  const [favorite, setFavorite] = useState<boolean>(false);

  const merchant = useAppSelector(state => state.merchant.selectedMerchant);
  const menus = useAppSelector(state => state.merchant.menus);
  const carts = useAppSelector(state => state.merchant.carts);
  const dispatch = useAppDispatch();

  const deviceHeight = Dimensions.get('window').height;

  const getCarts = carts.filter(cart => cart.merchantId === merchant?.id);

  const qty = getCarts.reduce((acc, cart) => acc + Number(cart.qty), 0);
  const price = getCarts.reduce((acc, cart) => acc + Number(cart.price), 0);

  console.log(qty);

  const handleOnCloseModal = () => {
    dispatch(reset());
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const headerComponent = () => (
    <HStack
      bg="white"
      width={'100%'}
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={3}
      shadow={2}
      space={2}>
      <TouchableOpacity onPress={() => props.closeModal()}>
        <Icon as={<Ionicons name="arrow-back-outline" />} size={6} />
      </TouchableOpacity>
      {merchant && (
        <HStack reversed alignItems="center" space={3}>
          <TouchableOpacity onPress={handleFavorite}>
            <Icon
              as={<Ionicons name={!favorite ? 'heart-outline' : 'heart'} />}
              size={6}
              color={favorite ? 'red.600' : 'black'}
            />
          </TouchableOpacity>
          <Heading
            alignSelf="flex-start"
            color="white"
            bg="green.600"
            borderRadius={100}
            px={3}
            py={1}
            fontSize="xs"
            size="sm"
            textTransform="uppercase">
            Buka
          </Heading>
        </HStack>
      )}
    </HStack>
  );

  return (
    <Portal>
      <Modalize
        ref={ref}
        onClose={handleOnCloseModal}
        HeaderComponent={headerComponent}
        snapPoint={(deviceHeight / 100) * 75}>
        {merchant ? (
          <>
            {qty > 0 && (
              <TouchableOpacity onPress={() => {}}>
                <HStack bg="red.600" p={4} justifyContent="space-between">
                  <Heading size="md" color="white">
                    Pesan Sekarang
                  </Heading>
                  <Heading size="md" color="white">
                    {`(x${qty}) ${currencyFormat(price)}`}
                  </Heading>
                </HStack>
              </TouchableOpacity>
            )}

            <VStack space={2}>
              <Image
                source={{uri: merchant.profileImage}}
                alt={merchant.name}
                width={'100%'}
                height={IMAGE_HEIGHT}
              />
              <VStack flex={1} space={2} px={4} pt={2}>
                <Heading size="lg">{merchant.name}</Heading>
                <VStack space={1}>
                  <Text fontSize="sm" color="gray.600">
                    {merchant.address}
                  </Text>
                  <HStack space={1} alignItems="center">
                    <Icon as={<Ionicons name="bicycle-outline" />} size={4} />
                    <Text fontSize="sm">{merchant.distance} km</Text>
                  </HStack>
                  <Rating
                    stars={merchant.rating.stars}
                    reviews={merchant.rating.review}
                    shouldShowReviewsText={true}
                    iconColor="yellow.500"
                    isSmall
                    textSize="sm"
                  />
                  <Separator height={2} />
                  <Heading size="xs">Jam Buka</Heading>
                  {merchant.open.map((open, index) => (
                    <HStack
                      width="200px"
                      justifyContent="space-between"
                      key={index}>
                      <Text fontSize="sm" color="gray.600">
                        {open.day}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        : {open.time}
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              </VStack>
              <Separator height={4} bg="gray.100" my={4} />
              <MenuList groups={menus} merchantId={merchant.id} />
            </VStack>
          </>
        ) : (
          <Loader />
        )}
      </Modalize>
    </Portal>
  );
});
