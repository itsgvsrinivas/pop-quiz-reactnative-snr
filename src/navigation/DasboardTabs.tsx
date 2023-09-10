import ProfileTab from '../screens/Tabs/ProfileTab';
import WatchListTab from '../screens/Tabs/WatchListTab';
import Dashboard from '../screens/Tabs/HomeTab';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

function DasboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Dashboard">
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchListTab"
        component={WatchListTab}
        options={{
          tabBarLabel: 'WatchList',
          tabBarIcon: ({color, size}) => (
            <Feather name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileTab}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default DasboardTabs;
