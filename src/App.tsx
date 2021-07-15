import React from 'react';
import {extendTheme, NativeBaseProvider} from 'native-base';
import {Host} from 'react-native-portalize';
import {NavigationContainer} from '@react-navigation/native';
import RootStackNavigator from 'navigation/RootStackNavigator';
import {Provider} from 'react-redux';
import {stores} from 'stores';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  },
});

class App extends React.Component {
  render() {
    return (
      <Provider store={stores}>
        <NativeBaseProvider theme={theme}>
          <Host>
            <NavigationContainer>
              <RootStackNavigator />
            </NavigationContainer>
          </Host>
        </NativeBaseProvider>
      </Provider>
    );
  }
}

export default App;
