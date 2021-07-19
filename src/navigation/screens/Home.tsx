import React from 'react';
import {HomeContainer} from 'containers';
import {HomeScreenNavigationProps} from 'navigation/types';

type Props = {
  navigation: HomeScreenNavigationProps;
};

const HomeScreen = ({navigation}: Props) => (
  <HomeContainer navigation={navigation} />
);

export default HomeScreen;
