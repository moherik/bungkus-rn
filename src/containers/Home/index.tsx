import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Box, Heading, HStack, Icon, Text, View, VStack} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Ripple, Separator} from 'components';
import {merchants as mockMerchants, categories as mockCategories} from 'mocks';

import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchMerchants} from 'stores/merchant.store';
import {HomeScreenNavigationProps} from 'navigation/types';

import {MerchantList} from './MerchantList';
import {Recommendations} from './Recommendations';
import {Category} from './Category';
import {MerchantCategory} from 'models/merchant.model';

type Props = {
  navigation: HomeScreenNavigationProps;
};

const Home: React.FC<Props> = ({navigation}) => {
  const merchants = useAppSelector(state => state.merchant.merchants);
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState<MerchantCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const offsetAnim = useRef(new Animated.Value(0)).current;

  const previousScrollvalue = useRef<number>();
  const currentScrollValue = useRef<number>();
  const scrollEndTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchMerchants(mockMerchants));
      setCategories(mockCategories);
    };
    fetchData();
    setTimeout(() => setLoading(false), 2000);

    scrollAnim.addListener(handleScroll);
    return () => {
      scrollAnim.removeAllListeners();
    };
  }, [dispatch, scrollAnim]);

  const handleScroll = ({value}: {value: number}) => {
    previousScrollvalue.current = currentScrollValue.current;
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
    outputRange: [0, -110],
    extrapolate: 'clamp',
  });

  const translateYFooter = Animated.add(scrollAnim, offsetAnim).interpolate({
    inputRange: [0, 50],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const translateXCart = Animated.add(scrollAnim, offsetAnim).interpolate({
    inputRange: [0, 50],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  return (
    <View flex={1}>
      <Animated.View
        style={{
          transform: [{translateY: translateYHeader}],
          ...styles.header,
        }}>
        <VStack bg="red.600" space={2} px={4} py={2}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="lg" color="white">
              Bungkus
            </Heading>
            <HStack>
              <Ripple onPress={() => {}} borderRadius={40}>
                <Box p={2}>
                  <Icon
                    as={<MIcons name="bell-outline" />}
                    color="white"
                    size={6}
                  />
                </Box>
              </Ripple>
              <Ripple onPress={() => {}} borderRadius={40}>
                <Box p={2}>
                  <Icon
                    as={<MIcons name="shopping-outline" />}
                    color="white"
                    size={6}
                  />
                </Box>
              </Ripple>
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
        <Separator height={20} mt={4} />
        <Recommendations
          label="Rekomendasi di Sekitarmu"
          loading={loading}
          data={merchants}
        />
        <Separator height={3} />
        <Category data={categories} />
        <Separator bg="muted.100" height={3} mb={4} />
        <MerchantList
          navigation={navigation}
          loading={loading}
          label="Temukan Menu Favoritmu"
          data={merchants}
        />
      </Animated.ScrollView>

      <Animated.View
        style={{
          transform: [{translateY: translateYFooter}],
          ...styles.footer,
        }}>
        <Ripple bg="red.600" borderRadius="lg" onPress={() => {}}>
          <HStack
            px={4}
            py={2}
            justifyContent="space-between"
            alignItems="center">
            <VStack>
              <Text color="white">Semua menu di sekitar</Text>
              <Heading size="sm" color="white">
                Jl. Gajah Mada No.3 (1km)
              </Heading>
            </VStack>
            <Icon as={<MIcons name="chevron-right" />} color="white" size={6} />
          </HStack>
        </Ripple>
      </Animated.View>

      <Animated.View
        style={{
          transform: [{translateX: translateXCart}],
          ...styles.cart,
        }}>
        <Ripple
          bg="white"
          borderWidth={1}
          borderColor="muted.200"
          borderRadius="lg"
          onPress={() => {}}
          shadow={2}>
          <Box p={2}>
            <Icon as={<MIcons name="shopping-outline" />} size={8} />
          </Box>
        </Ripple>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
    margin: 10,
    zIndex: 999,
  },
  cart: {
    position: 'absolute',
    bottom: 0,
    right: -100,
    margin: 12,
    zIndex: 999,
  },
});

export default Home;
