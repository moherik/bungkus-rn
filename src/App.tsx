import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

import RootStackNavigator from 'navigation/RootStackNavigator';
import AuthStackNavigator from 'navigation/AuthNavigation';
import {stores} from 'stores';
import {useAppSelector} from 'hooks';

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
  const user = useAppSelector(state => state.auth.user);
  return user ? <RootStackNavigator /> : <AuthStackNavigator />;
};

export default App;
