import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import ArticleScreen from '../screens/ArticleScreen'
import SideBar from '../screens/SideBar'

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
    Article: { screen: ArticleScreen }
  },
  {
    headerMode: 'none'
  }
)
