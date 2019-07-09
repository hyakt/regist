import { AsyncStorage, Image, StyleSheet, View, Dimensions } from 'react-native'
import { Body, Button, Container, Content, Icon, Text } from 'native-base'
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
    <Container style={styles.container}>
      <Content contentContainerStyle={{ flex: 1 }}>
        <Body>
          <Image
            style={styles.icon}
            source={require('app/src/assets/images/logo.png')}
          />
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={() => _fetchToken()} >
              <Icon name='logo-github' />
              <Text>Sign In</Text>
            </Button>
          </View>
        </Body>
      </Content>
    </Container>
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
    flex: 1,
    width: width,
    resizeMode: 'cover'
  },
  buttonContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  button: {
    height: 60,
    width: 300,
    backgroundColor: '#272822',
    borderRadius: 20
  }
})
