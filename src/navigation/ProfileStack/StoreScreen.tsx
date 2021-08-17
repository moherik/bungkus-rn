import React from 'react';
import {StoreContaienr} from 'containers';
import {StoreScreenProps} from './index';

export const StoreScreen = ({navigation, route}: StoreScreenProps) => (
  <StoreContaienr navigation={navigation} route={route} />
);
