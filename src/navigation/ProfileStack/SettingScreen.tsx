import React from 'react';
import {SettingContainer} from 'containers';
import {SettingScreenProps} from './index';

export const SettingScreen = ({navigation, route}: SettingScreenProps) => (
  <SettingContainer navigation={navigation} route={route} />
);
