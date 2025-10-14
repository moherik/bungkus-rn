import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from './FeedScreen';

type FeedStackList = {
  Feed: undefined;
};

export type FeedScreenProps = StackScreenProps<FeedStackList, 'Feed'>;

const FeedStack = createNativeStackNavigator<FeedStackList>();

export const Feed = () => {
  return (
    <FeedStack.Navigator initialRouteName="Feed" screenOptions={{ headerShown: false }}>
      <FeedStack.Screen name="Feed" component={FeedScreen} />
    </FeedStack.Navigator>
  );
};
