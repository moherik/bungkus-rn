import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Modalize} from 'react-native-modalize';

import {Separator} from 'components';
import {MenuCategoryType, RecommendationMenuType} from 'models/menu/type';
import {
  recommendations as mockRecomm,
  menus as mockMenu,
  categories as mockCategories,
} from 'mocks';

import {useAppDispatch, useAppSelector} from 'hooks';
import {fetchMenus, selectMenu} from 'stores/menus';

import {Recommendations} from './Recommendations';
import {Menu} from './Menu';
import {Panel} from './Panel';
import DetailModal from './Modal';

const Home = () => {
  const [recommendations, setRecommendations] = useState<
    RecommendationMenuType[]
  >([]);
  const [categories, setCategories] = useState<MenuCategoryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const modalRef = useRef<Modalize>(null);

  const menus = useAppSelector(state => state.menu.menus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchMenus(mockMenu));
      setRecommendations(mockRecomm);
      setCategories(mockCategories);
    };

    fetchData();

    setTimeout(() => setLoading(false), 2000);

    return () => {};
  }, [dispatch]);

  const showModal = (id: number | string) => {
    dispatch(selectMenu(Number(id)));
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
        data={recommendations}
      />
      <Separator height={4} />
      <Panel loading={loading} categories={categories} />
      <Separator height={4} />
      <Menu
        showModal={showModal}
        loading={loading}
        label="Temukan Menu Favoritmu"
        data={menus}
      />
      <DetailModal ref={modalRef} closeModal={closeModal} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});

export default Home;
