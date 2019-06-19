import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import SideBar from '../screens/SideBar'

export default createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    SideBar: { screen: SideBar }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)
