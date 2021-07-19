import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {Separator} from 'components';
import {MenuCategoryType} from 'models/menuType';
import {merchants as mockMerchants, categories as mockCategories} from 'mocks';

import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchMerchants, selectMerchant} from 'stores/merchant';
import {MenuModal} from 'containers/Shared/MenuModal';
import {HomeScreenNavigationProps} from 'navigation/types';

import {MerchantList} from './MerchantList';
import {Panel} from './Panel';
import {Recommendations} from './Recommendations';

type Props = {
  navigation: HomeScreenNavigationProps;
};

const Home: React.FC<Props> = ({navigation}) => {
  const [categories, setCategories] = useState<MenuCategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef<Modalize>(null);

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

  const showModal = (id: number | string) => {
    dispatch(selectMerchant(Number(id)));
    modalRef.current?.open();
  };

  const closeModal = () => modalRef.current?.close();

  return (
    <ScrollView
      stickyHeaderIndices={[2]}
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <Recommendations
        showModal={showModal}
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
      <MenuModal ref={modalRef} closeModal={closeModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Home;
