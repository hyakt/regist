import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Right,
  Title,
  StyleProvider,
  Text,
  Content
} from 'native-base'
import {
  Dimensions,
  StyleSheet,
  TextInput
} from 'react-native'
import React, { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'

import { monokai } from 'react-syntax-highlighter/styles/hljs'
import getTheme from 'app/native-base-theme/components'
import platform from 'app/native-base-theme/variables/platform'
import github from 'app/src/utility/github'

const width = Dimensions.get('window').width

export default (props) => {
  const { navigation } = props
  const [editable, setEditable] = useState(false)

  useEffect(() => {
  }, [])

  const onPressSave = async () => {
  }

  const makePayload = () => {
  }

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
          </Body>
        </Header>
        <Content>
        </Content>
      </Container>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({
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
