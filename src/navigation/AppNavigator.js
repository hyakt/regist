import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthLoadingScreen from 'app/src/screens/AuthLoadingScreen'
import AuthScreen from 'app/src/screens/AuthScreen'
import MainNavigator from 'app/src/navigation/MainNavigator'

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    Main: MainNavigator
  }, {
    initialRouteName: 'AuthLoading'
  })
)
