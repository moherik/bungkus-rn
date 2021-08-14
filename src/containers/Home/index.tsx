/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Heading, HStack, Icon, Text, View, VStack} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Separator} from 'components';
import {merchants as mockMerchants} from 'mocks';

import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchMerchants} from 'stores/merchant.store';
import {HomeScreenNavigationProps} from 'navigation/types';

import {MerchantList} from './MerchantList';
import {Recommendations} from './Recommendations';

type Props = {
  navigation: HomeScreenNavigationProps;
};

const Home: React.FC<Props> = ({navigation}) => {
  const merchants = useAppSelector(state => state.merchant.merchants);
  const dispatch = useAppDispatch();

  // const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollAnim] = useState(new Animated.Value(0));
  const [offsetAnim] = useState(new Animated.Value(0));

  let previousScrollvalue: number;
  let currentScrollValue: number;
  let scrollEndTimer: NodeJS.Timeout;

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchMerchants(mockMerchants));
      // setCategories(mockCategories);
    };
    fetchData();
    setTimeout(() => setLoading(false), 2000);

    scrollAnim.addListener(handleScroll);
    return () => {
      scrollAnim.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, scrollAnim]);

  const handleScroll = ({value}: {value: number}) => {
    previousScrollvalue = currentScrollValue;
    currentScrollValue = value;
  };

  const handleScrollEndDrag = () => {
    scrollEndTimer = setTimeout(handleMomentumScrollEnd, 250);
  };

  const handleMomentumScrollBegin = () => {
    clearTimeout(scrollEndTimer);
  };

  const handleMomentumScrollEnd = () => {
    const previous = previousScrollvalue;
    const current = currentScrollValue;

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
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  return (
    <View flex={1}>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          transform: [{translateY: translateYHeader}],
        }}>
        <VStack bg="red.600" space={2} px={4} py={2}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="lg" color="white">
              Bungkus
            </Heading>
            <HStack space={3}>
              <Icon
                onPress={() => {}}
                as={<MIcons name="bell-outline" />}
                color="white"
                size={6}
              />
              <Icon
                onPress={() => {}}
                as={<MIcons name="shopping-outline" />}
                color="white"
                size={6}
              />
            </HStack>
          </HStack>
          <HStack
            bg="white"
            borderRadius="lg"
            alignItems="center"
            space={4}
            px={4}
            py={2}
            mb={1}>
            <Icon as={<MIcons name="magnify" />} size={5} color="muted.400" />
            <Text color="muted.400">Cari menu apa hari ini?</Text>
          </HStack>
        </VStack>
      </Animated.View>

      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollAnim}}}],
          {useNativeDriver: true},
        )}
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollEndDrag={handleScrollEndDrag}>
        <Recommendations
          label="Rekomendasi di Sekitarmu"
          loading={loading}
          data={merchants}
        />
        <Separator height={4} />
        <MerchantList
          navigation={navigation}
          loading={loading}
          label="Temukan Menu Favoritmu"
          data={merchants}
        />
        <Separator height={500} />
      </Animated.ScrollView>

      <Animated.View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          transform: [{translateY}],
        }}>
        <HStack
          bg="red.600"
          px={4}
          py={2}
          m={2}
          borderRadius="lg"
          justifyContent="space-between"
          alignItems="center">
          <VStack>
            <Text color="white">Lokasi anda</Text>
            <Heading size="sm" color="white">
              Jl. Gajah Mada No.3
            </Heading>
          </VStack>
          <Icon as={<MIcons name="chevron-right" />} color="white" size={6} />
        </HStack>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 95,
  },
});

export default Home;
