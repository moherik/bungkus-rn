import React from 'react';
import {CartContainer} from 'containers';
import {CartScreenProps} from 'navigation/types';

const CartScreen = ({navigation, route}: CartScreenProps) => (
  <CartContainer navigation={navigation} route={route} />
);

export default CartScreen;
