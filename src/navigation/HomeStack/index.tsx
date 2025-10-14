import React from 'react';
import {StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

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

const HomeStack = createNativeStackNavigator<HomeStackList>();

export const Home = () => {
  return (
    <HomeStack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Detail" component={DetailScreen} />
      <HomeStack.Screen
        name="Category"
        component={CategoryScreen}
        initialParams={{category: undefined}}
      />
    </HomeStack.Navigator>
  );
};
