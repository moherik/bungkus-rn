import React from 'react';
import {HomeContainer} from 'containers';
import {HomeScreenProps} from './index';

const HomeScreen = ({navigation, route}: HomeScreenProps) => (
  <HomeContainer navigation={navigation} route={route} />
);

export default HomeScreen;
