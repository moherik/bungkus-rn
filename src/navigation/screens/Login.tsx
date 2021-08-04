import React from 'react';
import {LoginContainer} from 'containers';
import {LoginScreenProps} from 'navigation/types';

const LoginScreen = ({navigation, route}: LoginScreenProps) => (
  <LoginContainer navigation={navigation} route={route} />
);

export default LoginScreen;
