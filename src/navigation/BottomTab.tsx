import React from 'react';
import {useTheme, Icon} from 'native-base';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Profile} from './ProfileStack';
import {Home} from './HomeStack';
import {Feed} from './FeedStack';

type MainTabParamList = {
  Home: undefined;
  Feed: undefined;
  Profile: undefined;
};

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

const BottomTab = () => {
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
        component={Home}
        options={{
          tabBarLabel: 'Jelajahi',
          tabBarIcon: prop => tabBarIcon({name: 'compass-outline', ...prop}),
        }}
      />
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarLabel: 'Feed',
          tabBarIcon: prop => tabBarIcon({name: 'cards-outline', ...prop}),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: prop =>
            tabBarIcon({name: 'account-circle-outline', ...prop}),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
