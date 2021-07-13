import React from 'react';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MainTabNavigator from './MainTabNavigator';
import {CartScreen, DetailScreen} from './screens';
import {Ionicons} from '../components';
import {Box, Text} from '../themes/styled';
import {APPBAR_TITLE} from '../utils/constants';
import {useStyled} from '../hooks';

const Stack = createStackNavigator();

const _headerTitle = () => <Text variant="title2">{APPBAR_TITLE}</Text>;

const _headerRight = ({navigation, theme}) => (
  <Box flexDirection="row">
    <ActionButton
      theme={theme}
      color={theme.colors.foreground}
      icon="location"
      label="Lamongan"
    />
  </Box>
);

const ActionButton = ({
  theme,
  label,
  icon,
  color,
  iconSize = 18,
  navigation,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <Box flexDirection="row" alignItems="center" mr={theme.space.m}>
        {label && (
          <Text variant="caption1" color={color} mr={theme.space.s}>
            {label}
          </Text>
        )}
        <Ionicons name={icon} color={color} size={iconSize} />
      </Box>
    </TouchableOpacity>
  );
};

const RootStackNavigator = () => {
  const theme = useStyled();

  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen
        name="Tab"
        component={MainTabNavigator}
        options={({navigation}) => ({
          headerTitle: () => _headerTitle({theme}),
          headerStyle: {
            backgroundColor: theme.colors.background,
            elevation: 0,
          },
          headerRight: () => _headerRight({navigation, theme}),
        })}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
