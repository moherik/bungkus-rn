import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
  TransitionPresets,
} from '@react-navigation/stack';

import {MenuItem} from 'models/menu.model';
import {Merchant, CartItem, MerchantCategory} from 'models/merchant.model';

import {BottomTab} from '../BottomTab';
import AddToCartScreen from './AddToCartScreen';
import CheckoutScreen from './CheckoutScreen';
import SearchScreen from './SearchScreen';
import {CartScreen} from './CartScreen';
import NotificationScreen from './NotificationScreen';
import AddStoreScreen from './AddStoreScreen';

export type RootStackParamList = {
  Tab: undefined;
  AddToCart: {
    merchant: Merchant;
    menu: MenuItem;
    cart?: CartItem;
  };
  Cart: undefined;
  Checkout: {
    merchant: Merchant;
  };
  Search: {
    categories: MerchantCategory[];
  };
  Notification: undefined;
  AddStore: undefined;
};

export type TabScreenProps = StackScreenProps<RootStackParamList, 'Tab'>;
export type AddToCartScreenProps = StackScreenProps<
  RootStackParamList,
  'AddToCart'
>;
export type CartScreenProps = StackScreenProps<RootStackParamList, 'Cart'>;
export type CheckoutScreenProps = StackScreenProps<
  RootStackParamList,
  'Checkout'
>;
export type SearchScreenProps = StackScreenProps<RootStackParamList, 'Search'>;
export type NotificationScreenProps = StackScreenProps<
  RootStackParamList,
  'Notification'
>;
export type AddStoreScreenProps = StackScreenProps<
  RootStackParamList,
  'AddStore'
>;

const Root = createStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return (
    <Root.Navigator headerMode="none" mode="modal" initialRouteName="Tab">
      <Root.Screen name="Tab" component={BottomTab} />
      <Root.Screen
        name="AddToCart"
        component={AddToCartScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <Root.Screen name="Cart" component={CartScreen} />
      <Root.Screen name="Checkout" component={CheckoutScreen} />
      <Root.Screen name="Search" component={SearchScreen} />
      <Root.Screen name="Notification" component={NotificationScreen} />
      <Root.Screen name="AddStore" component={AddStoreScreen} />
    </Root.Navigator>
  );
};
