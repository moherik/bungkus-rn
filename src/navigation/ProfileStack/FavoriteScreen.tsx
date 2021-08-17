import React from 'react';
import {FavoriteContainer} from 'containers';
import {FavoriteScreenProps} from './index';

export const FavoriteScreen = ({navigation, route}: FavoriteScreenProps) => (
  <FavoriteContainer navigation={navigation} route={route} />
);
