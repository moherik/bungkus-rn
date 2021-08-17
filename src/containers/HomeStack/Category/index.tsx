import React from 'react';
import {Image} from 'native-base';
import {CategoryScreenProps} from 'navigation/types';
import {SharedElement} from 'react-navigation-shared-element';
import {Dimensions} from 'react-native';

type Props = {} & CategoryScreenProps;

const IMAGE_WIDTH = Dimensions.get('window').width;

const Category: React.FC<Props> = ({route}) => {
  const {category} = route.params;

  return (
    <SharedElement id={`item.${category.id}.image`}>
      <Image
        source={{uri: category.image}}
        alt={category.name}
        width={IMAGE_WIDTH}
        height={200}
      />
    </SharedElement>
  );
};

export default Category;
