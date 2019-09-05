import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import { Root } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import AppNavigator from 'app/src/navigation/AppNavigator'

export default (props) => {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    )
  } else {
    return (
      <Root>
        <AppNavigator />
      </Root>
    )
  }
}

const loadResourcesAsync = async () => {
  await Promise.all([
    Asset.loadAsync([
    ]),
    Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'AnonymousPro_Bold': require('./src/assets/fonts/AnonymousPro-Bold.ttf'),
      ...Ionicons.font
    })
  ])
}

const handleLoadingError = (error) => {
  console.warn(error)
}

const handleFinishLoading = (setLoadingComplete) => {
  setLoadingComplete(true)
}
