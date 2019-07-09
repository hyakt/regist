import React from 'react'
import { createAppContainer } from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import { Transition } from 'react-native-reanimated'

import AuthLoadingScreen from 'app/src/screens/AuthLoadingScreen'
import AuthScreen from 'app/src/screens/AuthScreen'
import MainNavigator from 'app/src/navigation/MainNavigator'

export default createAppContainer(
  createAnimatedSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    Main: MainNavigator
  }, {
    initialRouteName: 'AuthLoading',
    transition: (
      <Transition.Together>
        <Transition.Out
          type='slide-bottom'
          durationMs={400}
          interpolation='easeIn'
        />
        <Transition.In type='fade' durationMs={500} />
      </Transition.Together>
    )
  })
)
