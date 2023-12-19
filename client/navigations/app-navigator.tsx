import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../screens/Home';
import HeaderTabs from '../components/tabs/HeaderTabs';
import Account from '../screens/Account';
import Post from '../screens/Post';
import Profile from '../screens/Profile';
import ChangePassword from '../screens/ChangePassword';
import LinkView from '../screens/LinkView';
import Trending from '../screens/Trending';
import {Link} from '../types/link';
export type AppStackParamList = {
  Home: undefined;
  Account: undefined;
  Post: undefined;
  Profile: undefined | {name: string; _id: string};
  ChangePassword: undefined;
  LinkView: {link: Link};
  Trending: undefined;
};
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}
      // screenOptions={{headerShown: false}}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'LinksDaily',
          headerRight: () => <HeaderTabs />,
        }}
      />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Post" component={Post} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        options={({route}) => ({
          // title: route.params?.name || 'Profile',
          // headerShown: false,
          // headerTransparent: true,
        })}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{title: 'Change Password'}}
      />
      <Stack.Screen
        name="LinkView"
        component={LinkView}
        options={{
          title: '',
        }}
      />
      <Stack.Screen name="Trending" component={Trending} />
    </Stack.Navigator>
  );
};
export default AppNavigator;
