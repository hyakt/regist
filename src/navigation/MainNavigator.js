import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import HomeScreen from 'app/src/screens/HomeScreen'
import EditScreen from 'app/src/screens/EditScreen'
import AddScreen from 'app/src/screens/AddScreen'
import SideBar from 'app/src/screens/SideBar'

const drawerNavigator = createDrawerNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)

export default createStackNavigator(
  {
    Home: { screen: drawerNavigator },
    Edit: { screen: EditScreen },
    Add: { screen: AddScreen }
  },
  {
    headerMode: 'none'
  }
)
