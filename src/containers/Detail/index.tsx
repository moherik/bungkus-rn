import React, {useEffect, useState} from 'react';
import {TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Heading, HStack, Icon, Image, Text, VStack} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppSelector} from 'hooks';
import {Rating, Separator} from 'components';
import {currencyFormat} from 'utils';
import {DetailScreenProps} from 'navigation/types';

import {Loader} from './Loader';
import {MenuList} from './MenuList';

const IMAGE_HEIGHT = 240;

type Props = {} & DetailScreenProps;

const Detail: React.FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const merchant = useAppSelector(state => state.merchant.selectedMerchant);
  const menus = useAppSelector(state => state.merchant.menus);
  const carts = useAppSelector(state => state.merchant.selectedCarts);

  useEffect(() => {
    if (merchant && menus) {
      setLoading(false);
    }
  }, [merchant, menus]);

  const qty = carts?.reduce((acc, cart) => acc + Number(cart.qty), 0);
  const price = carts?.reduce((acc, cart) => acc + Number(cart.price), 0);

  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  return (
    <>
      <HStack
        bg="white"
        width={'100%'}
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={3}
        shadow={2}
        space={2}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={<Ionicons name="arrow-back-outline" />} size={6} />
        </TouchableOpacity>
        {!loading && (
          <HStack reversed alignItems="center" space={3}>
            <TouchableOpacity onPress={handleFavorite}>
              <Icon
                as={<Ionicons name={!favorite ? 'heart-outline' : 'heart'} />}
                size={6}
                color={favorite ? 'red.600' : 'black'}
              />
            </TouchableOpacity>
            <Heading
              color="white"
              bg="green.600"
              borderRadius={100}
              px={3}
              py={1}
              fontSize="xs"
              textTransform="uppercase">
              Buka
            </Heading>
          </HStack>
        )}
      </HStack>

      {!loading && merchant ? (
        <ScrollView style={styles.container}>
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
            <MenuList groups={menus} merchantId={merchant.id} carts={carts} />
          </VStack>
        </ScrollView>
      ) : (
        <Loader />
      )}

      {!loading && qty > 0 && (
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Detail;
