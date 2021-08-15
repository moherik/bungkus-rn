import React, {useEffect, useState} from 'react';
import {Animated, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {Box, Heading, HStack, Icon} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ripple} from 'components';
import {useAppSelector} from 'hooks';
import {currencyFormat} from 'utils';
import {DetailScreenProps} from 'navigation/types';

import {Loader} from './Loader';
import {MenuItem} from './MenuItem';
import {Header} from './Header';

type Props = {} & DetailScreenProps;

const Detail: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [translation] = useState(new Animated.Value(50));

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

  const handleOnScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = e.nativeEvent.contentOffset.y;

    if (scrollY > 280) {
      Animated.timing(translation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translation, {
        toValue: 50,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <Box bg="white" flex={1}>
      <HStack
        bg="white"
        alignItems="center"
        justifyContent="space-between"
        shadow={2}
        space={2}
        overflow="hidden">
        <HStack alignItems="center">
          <Ripple onPress={() => navigation.goBack()}>
            <Box p={3}>
              <Icon as={<MIcons name="arrow-left" />} size={6} />
            </Box>
          </Ripple>
          <Animated.View
            style={{
              transform: [{translateY: translation}],
            }}>
            <Heading size="md" isTruncated>
              {merchant?.name}
            </Heading>
          </Animated.View>
        </HStack>
        {!loading && (
          <HStack reversed alignItems="center" space={2}>
            <Ripple mr={2} borderRadius={100} onPress={() => handleFavorite()}>
              <Box p={2}>
                <Icon
                  as={<MIcons name={!favorite ? 'heart-outline' : 'heart'} />}
                  size={6}
                  color={favorite ? 'red.600' : 'black'}
                />
              </Box>
            </Ripple>
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
        <Animated.SectionList
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
          onScroll={handleOnScroll}
        />
      ) : (
        <Loader />
      )}

      {!loading && qty > 0 && (
        <Ripple bg="red.600" onPress={handleCheckout}>
          <HStack justifyContent="space-between" px={4} py={4}>
            <Heading size="sm" color="white">
              Lihat Keranjang
            </Heading>
            <Heading size="sm" color="white">
              (X{qty}) {`${currencyFormat(price)}`}
            </Heading>
          </HStack>
        </Ripple>
      )}
    </Box>
  );
};

export default Detail;
