import React, { useEffect } from 'react'
import {
  StyleSheet, View, AsyncStorage, ActivityIndicator, StatusBar
} from 'react-native'

export default (props) => {
  useEffect(() => {
    bootstrapAsync()
  }, [])

  const bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log(token)
    props.navigation.navigate(token == null ? 'Auth' : 'Main')
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator />
      <StatusBar barStyle='default' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
