import {
  AsyncStorage,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {
  Body,
  Button,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title,
  StyleProvider
} from 'native-base'
import React, { useState, useEffect } from 'react'
import invert from 'invert-color'
import _ from 'lodash'

import github from 'app/src/utility/github'
import lang from 'app/src/constants/Languages'

import getTheme from 'app/native-base-theme/components'
import platform from 'app/native-base-theme/variables/platform'

const width = Dimensions.get('window').width

export default (props) => {
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [gists, setGists] = useState()
  const [articles, setArticles] = useState()
  const { navigation } = props

  // tokenを取得
  useEffect(() => {

  }, [])

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => { navigation.goBack() }} >
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
      </Container>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentContainer: {
    paddingTop: 30
  },
  cardHeader: {
  },
  headerText: {
    fontWeight: 'bold'
  },
  card: {
    width: width / 2
  }
})
