import React from 'react';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import LoginScreen from './Login';
import CompleteUserScreen from './CompleteUser';

export type AuthStackParamList = {
  Login: undefined;
  Complete: {
    phone: string;
    jwtToken: string;
  };
};

export type LoginScreenProps = StackScreenProps<AuthStackParamList, 'Login'>;
export type CompleteScreenProps = StackScreenProps<
  AuthStackParamList,
  'Complete'
>;
const AuthStack = createStackNavigator<AuthStackParamList>();

export const Auth = () => {
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
