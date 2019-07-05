import React from 'react'
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { fromBottom, fromRight } from 'react-navigation-transitions'

import HomeScreen from 'app/src/screens/HomeScreen'
import EditScreen from 'app/src/screens/EditScreen'
import AddScreen from 'app/src/screens/AddScreen'
import SideBar from 'app/src/screens/SideBar'

const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]

  if (prevScene &&
      prevScene.route.routeName === 'Home' &&
      nextScene.route.routeName === 'Add') {
    return fromBottom(600)
  } else {
    return fromRight()
  }
}

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
    headerMode: 'none',
    transitionConfig: (nav) => handleCustomTransition(nav)
  }
)
