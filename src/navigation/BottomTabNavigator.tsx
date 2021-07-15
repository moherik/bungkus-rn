import React from 'react';
import {useTheme, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
}) => <Icon as={<Ionicons name={name} />} size={size} color={color} />;

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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: prop => tabBarIcon({name: 'home-outline', ...prop}),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: prop => tabBarIcon({name: 'fast-food-outline', ...prop}),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: prop => tabBarIcon({name: 'person-outline', ...prop}),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
