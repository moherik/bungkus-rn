import React from 'react';
import {CategoryContainer} from 'containers';
import {CategoryScreenProps} from './index';

const CategoryScreen = ({navigation, route}: CategoryScreenProps) => (
  <CategoryContainer navigation={navigation} route={route} />
);

export default CategoryScreen;
