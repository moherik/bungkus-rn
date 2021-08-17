import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {ProfileScreen} from './ProfileScreen';
import {StoreScreen} from './StoreScreen';

type ProfileStackList = {
  Profile: undefined;
  Store: undefined;
  Order: undefined;
  Favorite: undefined;
  Setting: undefined;
  Cart: undefined;
};

export type ProfileScreenProps = StackScreenProps<ProfileStackList, 'Profile'>;
export type StoreScreenProps = StackScreenProps<ProfileStackList, 'Store'>;
export type OrderScreenProps = StackScreenProps<ProfileStackList, 'Order'>;
export type FavoriteScreenProps = StackScreenProps<
  ProfileStackList,
  'Favorite'
>;
export type SettingScreenProps = StackScreenProps<ProfileStackList, 'Setting'>;
export type CartScreenProps = StackScreenProps<ProfileStackList, 'Cart'>;

const ProfileStack = createSharedElementStackNavigator<ProfileStackList>();

export const Profile = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      headerMode="none"
      mode="modal">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Store" component={StoreScreen} />
    </ProfileStack.Navigator>
  );
};
