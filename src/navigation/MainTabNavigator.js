import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {FeedScreen, HomeScreen, ProfileScreen} from './screens';
import {Ionicons} from '../components';
import {useStyled} from '../hooks';

const Tab = createMaterialTopTabNavigator();

const tabBarIcon = ({name, size = 24, focused, color}) => (
  <Ionicons name={name} size={size} color={color} />
);

const MainTabNavigator = () => {
  const theme = useStyled();

  const tabBarOptions = {
    showIcon: true,
    activeTintColor: theme.navigation.activeTintColor,
    inactiveTintColor: theme.navigation.inactiveTintColor,
    style: {backgroundColor: theme.navigation.background},
    tabStyle: {flexDirection: 'row'},
    indicatorStyle: {
      height: 3,
      backgroundColor: theme.navigation.activeTintColor,
    },
    labelStyle: {fontWeight: 'bold'},
  };

  return (
    <Tab.Navigator initialRouteName="Explore" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Explore"
        component={HomeScreen}
        options={{
          tabBarIcon: prop => tabBarIcon({name: 'compass', ...prop}),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: prop => tabBarIcon({name: 'fast-food', ...prop}),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: prop => tabBarIcon({name: 'person', ...prop}),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
