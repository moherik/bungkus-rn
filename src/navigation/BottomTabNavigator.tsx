import React from 'react';
import {useTheme, Icon} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FeedScreen, HomeScreen, ProfileScreen} from './screens';
import {MainTabParamList} from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabBarIcon = ({
  name,
  size = 23,
  color,
}: {
  name: string;
  size?: number;
  focused: boolean;
  color: string;
}) => <Icon as={<MIcons name={name} />} size={size} color={color} />;

const BottomTabNavigator = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        inactiveTintColor: colors.black,
        activeTintColor: colors.red['600'],
      }}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: prop => tabBarIcon({name: 'cards-outline', ...prop}),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Jelajahi',
          tabBarIcon: prop => tabBarIcon({name: 'compass-outline', ...prop}),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: prop =>
            tabBarIcon({name: 'account-circle-outline', ...prop}),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
