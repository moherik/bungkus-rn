import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import FeedScreen from './FeedScreen';

type FeedStackList = {
  Feed: undefined;
};

export type FeedScreenProps = StackScreenProps<FeedStackList, 'Feed'>;

const FeedStack = createSharedElementStackNavigator<FeedStackList>();

export const Feed = () => {
  return (
    <FeedStack.Navigator initialRouteName="Feed" headerMode="none" mode="modal">
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
};
