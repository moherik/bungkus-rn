import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import {ProfileScreen} from './ProfileScreen';
import {MyOrderScreen} from './MyOrderScreen';
import {StoreScreen} from './StoreScreen';
import {FavoriteScreen} from './FavoriteScreen';
import {SettingScreen} from './SettingScreen';
import {HelpScreen} from './HelpScreen';
import {UserContainer} from 'containers';

type ProfileStackList = {
  Profile: undefined;
  User: undefined;
  Store: undefined;
  MyOrder: undefined;
  Favorite: undefined;
  Setting: undefined;
  Help: undefined;
};

export type ProfileScreenProps = StackScreenProps<ProfileStackList, 'Profile'>;
export type UserScreenProps = StackScreenProps<ProfileStackList, 'User'>;
export type StoreScreenProps = StackScreenProps<ProfileStackList, 'Store'>;
export type MyOrderScreenProps = StackScreenProps<ProfileStackList, 'MyOrder'>;
export type FavoriteScreenProps = StackScreenProps<
  ProfileStackList,
  'Favorite'
>;
export type SettingScreenProps = StackScreenProps<ProfileStackList, 'Setting'>;
export type HelpScreenProps = StackScreenProps<ProfileStackList, 'Help'>;

const ProfileStack = createSharedElementStackNavigator<ProfileStackList>();

export const Profile = () => {
  return (
    <ProfileStack.Navigator
      initialRouteName="Profile"
      headerMode="none"
      mode="modal">
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="User" component={UserContainer} />
      <ProfileStack.Screen name="MyOrder" component={MyOrderScreen} />
      <ProfileStack.Screen name="Favorite" component={FavoriteScreen} />
      <ProfileStack.Screen name="Store" component={StoreScreen} />
      <ProfileStack.Screen name="Setting" component={SettingScreen} />
      <ProfileStack.Screen name="Help" component={HelpScreen} />
    </ProfileStack.Navigator>
  );
};
