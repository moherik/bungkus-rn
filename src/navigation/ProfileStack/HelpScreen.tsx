import React from 'react';
import {HelpContainer} from 'containers';
import {HelpScreenProps} from './index';

export const HelpScreen = ({navigation, route}: HelpScreenProps) => (
  <HelpContainer navigation={navigation} route={route} />
);
