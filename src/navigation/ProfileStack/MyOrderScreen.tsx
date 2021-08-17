import React from 'react';
import {StoreContainer} from 'containers';
import {StoreScreenProps} from './index';

export const MyOrderScreen = ({navigation, route}: StoreScreenProps) => (
  <StoreContainer navigation={navigation} route={route} />
);
