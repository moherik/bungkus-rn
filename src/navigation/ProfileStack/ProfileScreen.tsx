import React from 'react';
import {ProfileContainer} from 'containers';
import {ProfileScreenProps} from './index';

export const ProfileScreen = ({navigation, route}: ProfileScreenProps) => (
  <ProfileContainer navigation={navigation} route={route} />
);
