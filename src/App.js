import React, {Component} from 'react';
import {Appearance} from 'react-native';
import {ThemeProvider} from 'styled-components';
import {NavigationContainer} from '@react-navigation/native';

import RootStackNavigator from './navigation/RootStackNavigator';
import {theme, darkTheme} from './themes';

class App extends Component {
  render() {
    const scheme = Appearance.getColorScheme();

    return (
      <ThemeProvider theme={scheme === 'light' ? theme : darkTheme}>
        <NavigationContainer>
          <RootStackNavigator />
        </NavigationContainer>
      </ThemeProvider>
    );
  }
}

export default App;
