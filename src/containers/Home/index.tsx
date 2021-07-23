import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import {Separator} from 'components';
import {MenuCategoryType} from 'models/menuType';
import {merchants as mockMerchants, categories as mockCategories} from 'mocks';

import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchMerchants} from 'stores/merchant';
import {HomeScreenNavigationProps} from 'navigation/types';

import {MerchantList} from './MerchantList';
import {Panel} from './Panel';
import {Recommendations} from './Recommendations';
import {Heading, HStack} from 'native-base';

type Props = {
  navigation: HomeScreenNavigationProps;
};

const Home: React.FC<Props> = ({navigation}) => {
  const [categories, setCategories] = useState<MenuCategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const merchants = useAppSelector(state => state.merchant.merchants);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchMerchants(mockMerchants));
      setCategories(mockCategories);
    };

    fetchData();

    setTimeout(() => setLoading(false), 2000);

    return () => {};
  }, [dispatch]);

  return (
    <>
      <HStack bg="white" px={4} py={3} shadow={2}>
        <Heading size="lg">Bungkus</Heading>
      </HStack>

      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        <Recommendations
          label="Rekomendasi di Sekitarmu"
          loading={loading}
          data={merchants}
        />
        <Separator height={4} />
        <Panel loading={loading} categories={categories} />
        <Separator height={4} />
        <MerchantList
          navigation={navigation}
          loading={loading}
          label="Temukan Menu Favoritmu"
          data={merchants}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Home;
