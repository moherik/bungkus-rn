import React, {useEffect, useState} from 'react';
import {TouchableOpacity, SectionList} from 'react-native';
import {Box, Heading, HStack, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {useAppSelector} from 'hooks';
import {currencyFormat} from 'utils';
import {DetailScreenProps} from 'navigation/types';

import {Loader} from './Loader';
import {MenuItem} from './MenuItem';
import {Header} from './Header';

type Props = {} & DetailScreenProps;

const Detail: React.FC<Props> = ({navigation, route}) => {
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

  const handleCheckout = () => {
    navigation.navigate('Cart', {merchant: merchant!!});
  };

  return (
    <Box bg="white" flex={1}>
      <HStack
        bg="white"
        alignItems="center"
        justifyContent="space-between"
        px={4}
        py={3}
        shadow={2}
        space={2}>
        <Icon
          as={<Ionicons name="arrow-back-outline" />}
          size={6}
          onPress={() => navigation.goBack()}
        />
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
      {!loading && menus ? (
        <SectionList
          sections={menus}
          keyExtractor={(item, index) => item.id.toString() + index}
          ListHeaderComponent={<Header merchant={merchant!!} />}
          stickySectionHeadersEnabled={true}
          renderItem={({item: menu}) => (
            <MenuItem
              menu={menu}
              merchant={merchant!!}
              carts={carts}
              navigation={navigation}
              route={route}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Heading
              size="sm"
              px={4}
              py={2}
              bg="white"
              borderBottomColor="gray.100"
              borderBottomWidth={1}>
              {title}
            </Heading>
          )}
        />
      ) : (
        <Loader />
      )}
      {!loading && qty > 0 && (
        <TouchableOpacity onPress={handleCheckout}>
          <HStack
            bg="red.600"
            p={4}
            alignItems="center"
            justifyContent="space-between">
            <Heading size="md" color="white">
              Pesan Sekarang
            </Heading>
            <HStack space={4}>
              <Heading size="md" color="white">
                X{qty}
              </Heading>
              <Heading size="md" color="white">
                {`${currencyFormat(price)}`}
              </Heading>
            </HStack>
          </HStack>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default Detail;
