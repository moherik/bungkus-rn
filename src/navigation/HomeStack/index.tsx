import React from 'react';
import {StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {MerchantCategory} from 'models/merchant.model';

import CategoryScreen from './CategoryScreen';
import DetailScreen from './DetailScreen';
import HomeScreen from './HomeScreen';

type HomeStackList = {
  Home: undefined;
  Detail: {merchantId: number};
  Category: {
    category: MerchantCategory;
  };
};

export type HomeScreenProps = StackScreenProps<HomeStackList, 'Home'>;
export type DetailScreenProps = StackScreenProps<HomeStackList, 'Detail'>;
export type CategoryScreenProps = StackScreenProps<HomeStackList, 'Category'>;

const HomeStack = createSharedElementStackNavigator<HomeStackList>();

export const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" headerMode="none" mode="modal">
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{...TransitionPresets.SlideFromRightIOS}}
      />
      <HomeStack.Screen
        name="Category"
        component={CategoryScreen}
        initialParams={{category: undefined}}
        options={{
          cardStyleInterpolator: ({current}) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
        }}
        sharedElementsConfig={(route, _otherRoute, _showing) => {
          const {category} = route.params;
          return [
            {
              id: `item.${category.id}.image`,
              resize: 'none',
            },
          ];
        }}
      />
    </HomeStack.Navigator>
  );
};
