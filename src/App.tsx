import React, {useEffect, useState} from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import auth from '@react-native-firebase/auth';

import {stores} from 'stores';

import RootStackNavigator from 'navigation/RootStackNavigator';
import AuthStackNavigator from 'navigation/AuthNavigation';
import {useCheckUserQuery} from 'services/user.service';

const App = () => {
  return (
    <Provider store={stores}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

const Navigation = () => {
  const [token, setToken] = useState<string>();

  useEffect(() => {
    const getToken = async () => {
      const _token = await auth().currentUser?.getIdToken();
      setToken(_token);
    };

    getToken();

    return () => {};
  });

  const {data: user} = useCheckUserQuery(token || '');
  return user ? <RootStackNavigator /> : <AuthStackNavigator />;
};

export default App;
