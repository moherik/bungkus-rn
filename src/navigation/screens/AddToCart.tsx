import React from 'react';
import {AddToCartContainer} from 'containers';
import {AddToCartScreenProps} from 'navigation/types';

const AddToCartScreen = ({navigation, route}: AddToCartScreenProps) => (
  <AddToCartContainer navigation={navigation} route={route} />
);

export default AddToCartScreen;
