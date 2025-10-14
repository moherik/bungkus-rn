import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import LoginScreen from './Login';
import CompleteUserScreen from './CompleteUser';

export type AuthStackParamList = {
  Login: undefined;
  Complete: {
    phone: string;
    jwtToken: string;
  };
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Login'
>;
export type CompleteScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  'Complete'
>;
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const Auth = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Complete" component={CompleteUserScreen} />
    </AuthStack.Navigator>
  );
};
