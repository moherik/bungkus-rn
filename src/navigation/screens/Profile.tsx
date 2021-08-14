import React from 'react';
import {ProfileContainer} from 'containers';
import {ProfileScreenProps} from 'navigation/types';

const ProfileScreen = ({navigation, route}: ProfileScreenProps) => (
  <ProfileContainer navigation={navigation} route={route} />
);

export default ProfileScreen;
