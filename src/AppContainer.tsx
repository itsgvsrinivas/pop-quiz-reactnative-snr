import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './screens/DetailScreen';
import MoviesListScreen from './screens/MoviesListScreen';
import LoginScreen from './screens/LoginScreen';
import DasboardTabs from './navigation/DasboardTabs';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

const Stack = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoginScreen">
        <Stack.Screen
          name="Tabs"
          component={DasboardTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
        <Stack.Screen name="MoviesListScreen" component={MoviesListScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default AppContainer;
