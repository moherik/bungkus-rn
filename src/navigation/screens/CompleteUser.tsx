import React from 'react';
import {CompleteUserContainer} from 'containers';
import {CompleteScreenProps} from 'navigation/types';

const CompleteUserScreen = ({navigation, route}: CompleteScreenProps) => (
  <CompleteUserContainer navigation={navigation} route={route} />
);

export default CompleteUserScreen;
