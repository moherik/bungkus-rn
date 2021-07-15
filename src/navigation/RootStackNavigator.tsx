import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon, Text, Heading, HStack} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {CartScreen, DetailScreen} from './screens';
import {APPBAR_TITLE} from '../utils/constants';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from './types';

const RootStack = createStackNavigator<RootStackParamList>();

const _headerTitle = () => <Heading fontSize="2xl">{APPBAR_TITLE}</Heading>;

const _headerRight = (navigation: any) => (
  <HStack space={4} mr={4}>
    <ActionButton
      icon="location-outline"
      label="30 km"
      navigation={navigation}
    />
  </HStack>
);

type ActionButtonProps = {
  label?: string;
  icon: string;
  navigation: any;
};

const ActionButton: React.FC<ActionButtonProps> = ({label, icon}) => {
  return (
    <TouchableOpacity>
      <HStack alignItems="center" space={1}>
        {label && (
          <Text fontSize="sm" fontWeight="700">
            {label}
          </Text>
        )}
        <Icon as={<Ionicons name={icon} />} size={5} />
      </HStack>
    </TouchableOpacity>
  );
};

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator initialRouteName="Tab">
      <RootStack.Screen
        name="Tab"
        component={BottomTabNavigator}
        options={({navigation}) => ({
          headerTitle: () => _headerTitle(),
          headerStyle: {
            elevation: 1,
          },
          headerRight: () => _headerRight(navigation),
        })}
      />
      <RootStack.Screen
        name="Detail"
        component={DetailScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen name="Cart" component={CartScreen} />
    </RootStack.Navigator>
  );
};

export default RootStackNavigator;
