import {
  Dimensions,
  StyleSheet,
} from 'react-native'
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Title,
  StyleProvider
} from 'native-base'

import React, { useEffect } from 'react'

import SyntaxHighlighter from 'react-native-syntax-highlighter'

import getTheme from 'app/native-base-theme/components'
import platform from 'app/native-base-theme/variables/platform'

const width = Dimensions.get('window').width

export default (props) => {
  const { navigation } = props
  const { article } = navigation.state.params

  useEffect(() => {
    console.log(navigation.state.params)
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
            <Title>{article.filename}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <SyntaxHighlighter
            language={article.language.toLowerCase()}>
            {article.content}
          </SyntaxHighlighter>
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
