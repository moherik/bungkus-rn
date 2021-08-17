import React from 'react';
import {CartContainer} from 'containers';
import {CartScreenProps} from './index';

export const CartScreen = ({navigation, route}: CartScreenProps) => (
  <CartContainer navigation={navigation} route={route} />
);
