import React from 'react'
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Icon } from 'native-base'

import github from 'app/src/utility/github'

const { width } = Dimensions.get('window')

export default (props) => {
  const _fetchToken = async () => {
    const fetchToken = await github.getToken()
    await AsyncStorage.setItem('token', fetchToken)
    await props.navigation.navigate('AuthLoading')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>regist</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => _fetchToken()} >
          <Icon style={{ ...styles.buttonText, fontSize: 44 }} name='logo-github' />
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
  logoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText: {
    color: '#F75F95',
    fontSize: 60,
    fontFamily: 'AnonymousPro_Bold'
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
