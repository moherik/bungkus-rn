import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CompleteUserScreen, LoginScreen} from './screens';

import {AuthStackParamList} from './types';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      mode="modal"
      headerMode="none">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Complete" component={CompleteUserScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
