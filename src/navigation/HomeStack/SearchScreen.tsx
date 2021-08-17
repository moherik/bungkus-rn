import React from 'react';
import {SearchContainer} from 'containers';
import {SearchScreenProps} from './index';

const SearchScreen = ({navigation, route}: SearchScreenProps) => (
  <SearchContainer navigation={navigation} route={route} />
);

export default SearchScreen;
