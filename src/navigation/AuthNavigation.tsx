import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginContainer} from 'containers/Auth';

import {AuthStackParamList} from './types';

const AuthStack = createStackNavigator<AuthStackParamList>();

const LoginScreen = () => <LoginContainer />;

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      mode="modal"
      headerMode="none">
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
