import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Details from './screens/Details';
import SearchList from './screens/SearchList';
import Login from './screens/Login';
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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Tabs"
          component={DasboardTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="SearchList" component={SearchList} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
