import React from 'react';
import {AddToCartContainer} from 'containers';
import {AddToCartScreenProps} from './index';

const AddToCartScreen = ({navigation, route}: AddToCartScreenProps) => (
  <AddToCartContainer navigation={navigation} route={route} />
);

export default AddToCartScreen;
