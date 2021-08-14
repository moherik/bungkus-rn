import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import {Box, Heading, HStack, Icon} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {useAppSelector} from 'hooks';
import {currencyFormat} from 'utils';
import {DetailScreenProps} from 'navigation/types';

import {Loader} from './Loader';
import {MenuItem} from './MenuItem';
import {Header} from './Header';
import {Button, Ripple} from 'components';

type Props = {} & DetailScreenProps;

const Detail: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));

  const previousScrollvalue = useRef<number>();
  const currentScrollValue = useRef<number>();
  const scrollEndTimer = useRef<NodeJS.Timeout>();

  const merchant = useAppSelector(state => state.merchant.selectedMerchant);
  const menus = useAppSelector(state => state.merchant.menus);
  const carts = useAppSelector(state => state.merchant.selectedCarts);

  useEffect(() => {
    if (merchant && menus) {
      setLoading(false);
    }

    scrollAnim.addListener(handleScroll);
    return () => {
      scrollAnim.removeAllListeners();
    };
  }, [merchant, menus, scrollAnim]);

  const qty = carts?.reduce((acc, cart) => acc + Number(cart.qty), 0);
  const price = carts?.reduce((acc, cart) => acc + Number(cart.price), 0);

  const [favorite, setFavorite] = useState<boolean>(false);

  const handleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleCheckout = () => {
    navigation.navigate('Cart', {merchant: merchant!!});
  };

  const handleScroll = ({value}: {value: number}) => {
    previousScrollvalue.current = currentScrollValue.current!!;
    currentScrollValue.current = value;
  };

  const handleScrollEndDrag = () => {
    scrollEndTimer.current = setTimeout(handleMomentumScrollEnd, 250);
  };

  const handleMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer.current!!);
  };

  const handleMomentumScrollEnd = () => {
    const previous = previousScrollvalue.current!!;
    const current = currentScrollValue.current!!;

    if (previous > current || current < 50) {
      Animated.spring(offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(offsetAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const translateYHeader = Animated.add(scrollAnim, offsetAnim).interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const translateYFooter = Animated.add(scrollAnim, offsetAnim).interpolate({
    inputRange: [0, 50],
    outputRange: [0, 80],
    extrapolate: 'clamp',
  });

  return (
    <Box bg="white" flex={1}>
      <Animated.View
        style={{
          transform: [{translateY: translateYHeader}],
          ...styles.header,
        }}>
        <HStack
          bg="white"
          alignItems="center"
          justifyContent="space-between"
          shadow={2}
          space={2}>
          <Ripple onPress={() => navigation.goBack()}>
            <Box p={3}>
              <Icon as={<MIcons name="arrow-left" />} size={6} />
            </Box>
          </Ripple>
          {!loading && (
            <HStack reversed alignItems="center" space={2}>
              <Ripple
                mr={2}
                borderRadius={100}
                onPress={() => handleFavorite()}>
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
      </Animated.View>

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
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollAnim}}}],
            {useNativeDriver: true},
          )}
          onMomentumScrollBegin={handleMomentumScrollBegin}
          onMomentumScrollEnd={handleMomentumScrollEnd}
          onScrollEndDrag={handleScrollEndDrag}
        />
      ) : (
        <Loader />
      )}

      {!loading && qty > 0 && (
        <Animated.View
          style={{
            transform: [{translateY: translateYFooter}],
            ...styles.footer,
          }}>
          <Button
            py={4}
            borderRadius="lg"
            onPress={handleCheckout}
            textTransform="none">
            <Heading size="sm" color="white">
              Lihat Keranjang (X{qty}) {`${currencyFormat(price)}`}
            </Heading>
          </Button>
        </Animated.View>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    padding: 8,
  },
});

export default Detail;
