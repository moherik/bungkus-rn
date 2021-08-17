import React from 'react';
import {UserContainer} from 'containers';
import {UserScreenProps} from './index';

export const UserScreen = ({navigation, route}: UserScreenProps) => (
  <UserContainer navigation={navigation} route={route} />
);
