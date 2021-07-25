import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {MenuItem} from 'models/menu.model';
import {CartItem, Merchant} from 'models/merchant.model';

export type RootStackParamList = {
  Tab: undefined;
  Detail: {merchantId: number};
  AddToCart: {
    merchant: Merchant;
    menu: MenuItem;
    cart?: CartItem;
  };
  Cart: {
    merchant: Merchant;
  };
};

export type DetailScreenProps = StackScreenProps<RootStackParamList, 'Detail'>;

export type AddToCartScreenProps = StackScreenProps<
  RootStackParamList,
  'AddToCart'
>;

export type CartScreenProps = StackScreenProps<RootStackParamList, 'Cart'>;

export type DetailcreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'Detail'>,
  BottomTabNavigationProp<MainTabParamList>
>;

export type MainTabParamList = {
  Root: NavigatorScreenParams<RootStackParamList>;
  Home: undefined;
  Feed: undefined;
  Profile: undefined;
};

export type HomeScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Home'>,
  StackNavigationProp<RootStackParamList>
>;

export type HomeScreenProps = BottomTabScreenProps<MainTabParamList, 'Home'>;
export type FeedScreenProps = BottomTabScreenProps<MainTabParamList, 'Feed'>;
export type ProfileScreenProps = BottomTabScreenProps<
  MainTabParamList,
  'Profile'
>;

export type AuthStackParamList = {
  Login: undefined;
  Code: undefined;
};
