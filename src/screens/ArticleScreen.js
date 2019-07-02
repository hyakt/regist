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
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput
} from 'react-native'
import React, { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'

import { monokai } from 'react-syntax-highlighter/styles/hljs'
import getTheme from 'app/native-base-theme/components'
import platform from 'app/native-base-theme/variables/platform'

const width = Dimensions.get('window').width

export default (props) => {
  const { navigation } = props
  const { article } = navigation.state.params

  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(article.content)
  const [editing, setEditing] = useState(article.content)

  useEffect(() => {
    console.log(content)
  }, [])

  const onPressSave = () => {
    setEditable(!editable)
    // TODO: github upload content
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
            <Title>{article.filename}</Title>
          </Body>
          {editable
            ? <Right>
              <Button transparent
                onPress={onPressSave}>
                <Icon name='save' />
              </Button>
            </Right>
            : <Right />
          }
        </Header>

        <View style={styles.articleContainer}>
          {editable
            ? <TextInput
              value={content}
              multiline
              backgroundColor='#272822'
              autoCapitalize='none'
              onChangeText={(text) => setContent(text)} />
            : <TouchableHighlight
              onPress={() => setEditable(!editable)}>
              <SyntaxHighlighter
                language={article.language.toLowerCase()}
                style={monokai}
                fontSize={14}>
                {content}
              </SyntaxHighlighter>
            </TouchableHighlight>
          }
        </View>
      </Container>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  articleContainer: {
    width: '100%'
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
