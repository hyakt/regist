import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen'
import SideBar from '../screens/SideBar'

export default createDrawerNavigator(
  {
    Home: {screen: HomeScreen},
    SideBar: {screen: SideBar}
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)
