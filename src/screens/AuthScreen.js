import {
  AsyncStorage,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Icon } from 'native-base'
import React, { useEffect } from 'react'

import github from 'app/src/utility/github'

const { width } = Dimensions.get('window')

export default (props) => {
  useEffect(() => {
  }, [])

  const _fetchToken = async () => {
    const fetchToken = await github.getToken()
    await AsyncStorage.setItem('token', fetchToken)
    await props.navigation.navigate('AuthLoading')
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.icon}
        source={require('app/src/assets/images/logo.png')}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => _fetchToken()} >
          <Icon style={{...styles.buttonText, fontSize: 44}} name='logo-github' />
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#393E46',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    flex: 2,
    width: width,
    resizeMode: 'cover'
  },
  buttonContainer: {
    flex: 1
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: '100%',
    backgroundColor: '#F75F95'
  },
  buttonText: {
    color: '#fff',
    fontSize: 24
  }
})
