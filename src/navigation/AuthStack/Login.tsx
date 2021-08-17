import React from 'react';
import {LoginContainer} from 'containers';
import {LoginScreenProps} from './index';

const LoginScreen = ({navigation, route}: LoginScreenProps) => (
  <LoginContainer navigation={navigation} route={route} />
);

export default LoginScreen;
