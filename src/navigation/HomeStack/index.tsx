import React from 'react';
import {StackScreenProps, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {MenuItem} from 'models/menu.model';
import {CartItem, Merchant, MerchantCategory} from 'models/merchant.model';

import AddToCartScreen from './AddToCartScreen';
import CartScreen from './CartScreen';
import CategoryScreen from './CategoryScreen';
import DetailScreen from './DetailScreen';
import SearchScreen from './SearchScreen';
import HomeScreen from './HomeScreen';

type HomeStackList = {
  Home: undefined;
  Detail: {merchantId: number};
  AddToCart: {
    merchant: Merchant;
    menu: MenuItem;
    cart?: CartItem;
  };
  Cart: {
    merchant: Merchant;
  };
  Search: {
    categories: MerchantCategory[];
  };
  Category: {
    category: MerchantCategory;
  };
};

export type HomeScreenProps = StackScreenProps<HomeStackList, 'Home'>;
export type DetailScreenProps = StackScreenProps<HomeStackList, 'Detail'>;
export type AddToCartScreenProps = StackScreenProps<HomeStackList, 'AddToCart'>;
export type CartScreenProps = StackScreenProps<HomeStackList, 'Cart'>;
export type SearchScreenProps = StackScreenProps<HomeStackList, 'Search'>;
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
        name="AddToCart"
        component={AddToCartScreen}
        options={{...TransitionPresets.ModalSlideFromBottomIOS}}
      />
      <HomeStack.Screen name="Cart" component={CartScreen} />
      <HomeStack.Screen name="Search" component={SearchScreen} />
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
