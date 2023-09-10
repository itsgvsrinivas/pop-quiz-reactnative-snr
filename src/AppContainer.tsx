import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './screens/DetailScreen';
import MoviesListScreen from './screens/MoviesListScreen';
import LoginScreen from './screens/LoginScreen';
import DasboardTabs from './navigation/DasboardTabs';

const Stack = createNativeStackNavigator();

//cleanup
/* function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="WatchList" component={WatchList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
} */

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
    </NavigationContainer>
  );
};

export default AppContainer;
