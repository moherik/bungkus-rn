import React from 'react';
import {HomeScreenNavigationProps} from 'navigation/types';
import {HomeContainer} from 'containers';

const HomeScreen = ({navigation}: {navigation: HomeScreenNavigationProps}) => (
  <HomeContainer navigation={navigation} />
);

export default HomeScreen;
