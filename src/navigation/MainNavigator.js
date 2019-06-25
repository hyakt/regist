import React from 'react'
import { createDrawerNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import ArticleScreen from '../screens/ArticleScreen'
import SideBar from '../screens/SideBar'

export default createDrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Article: { screen: ArticleScreen }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
)
