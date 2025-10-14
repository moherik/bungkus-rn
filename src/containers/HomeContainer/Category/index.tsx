import React from 'react';
import {Dimensions} from 'react-native';
import {Image} from 'native-base';
import {useRoute} from '@react-navigation/native';

type Props = {};

const IMAGE_WIDTH = Dimensions.get('window').width;

const Category: React.FC<Props> = () => {
  const route = useRoute();
  const {category} = route.params;

  return (
    <Image
      source={{uri: category.image}}
      alt={category.name}
      width={IMAGE_WIDTH}
      height={200}
    />
  );
};

export default Category;
