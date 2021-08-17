import React from 'react';
import {CheckoutContainer} from 'containers';
import {CheckoutScreenProps} from './index';

const CheckoutScreen = ({navigation, route}: CheckoutScreenProps) => (
  <CheckoutContainer navigation={navigation} route={route} />
);

export default CheckoutScreen;
