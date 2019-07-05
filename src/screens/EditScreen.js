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
  Content,
  Footer
} from 'native-base'
import {
  Dimensions,
  StyleSheet,
  View,
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
  const { article } = navigation.state.params

  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(article.content)
  const [editing, setEditing] = useState(article.content)

  useEffect(() => {
    console.log(article)
  }, [])

  const onPressSave = async () => {
    await console.log(await github.updateGist(article.id, makePayload(), article.token))
    await setEditing(content)
    await setEditable(!editable)
  }

  const onPressCancel = async () => {
    await setContent(editing)
    await setEditable(!editable)
  }

  const makePayload = () => {
    return JSON.stringify({
      'description': article.description,
      'files': {
        [article.filename]: {
          'content': content,
          'filename': article.filename
        }
      }
    })
  }

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          {editable
           ? <Left>
               <Button
                 transparent
                 onPress={() => { onPressCancel() }} >
                 <Text>Cancel</Text>
               </Button>
             </Left>
           : <Left>
               <Button
                 transparent
                 onPress={() => { navigation.goBack() }} >
                 <Icon name='arrow-back' />
               </Button>
             </Left>
          }
          <Body>
            <Title>{article.filename}</Title>
          </Body>
          {editable
           ? <Right>
               <Button transparent onPress={onPressSave}>
                 {/* <Icon type='FontAwesome' name='save' /> */}
                 <Text>Save</Text>
               </Button>
             </Right>
           : <Right>
               <Button transparent onPress={() => setEditable(!editable)}>
                 {/* <Icon type='FontAwesome' name='edit' /> */}
                 <Text>Edit</Text>
               </Button>
             </Right>
          }
        </Header>
        <Content
          contentContainerStyle={{ flex:1 }}>
          {editable
           ? <TextInput
               value={content}
               multiline
               style={{paddingLeft: 8, lineHeight: 19}}
               color='#e6db74'
               backgroundColor='#272822'
               autoCapitalize='none'
               fontFamily='Menlo-Regular'
               fontSize={14}
               onChangeText={(text) => setContent(text)} />
           : <SyntaxHighlighter
               language={article.language ? article.language.toLowerCase() : 'text'}
               style={monokai}
               fontSize={14}>
               {content}
             </SyntaxHighlighter>
          }
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
