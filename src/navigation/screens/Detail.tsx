import React from 'react';
import {DetailContainer} from 'containers';
import {DetailScreenProps} from 'navigation/types';

const DetailScreen = ({navigation, route}: DetailScreenProps) => (
  <DetailContainer navigation={navigation} route={route} />
);

export default DetailScreen;
