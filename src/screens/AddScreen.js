import {
  Body,
  Button,
  Container,
  Content,
  Form,
  Header,
  Icon,
  Input,
  Item,
  Label,
  Left,
  Right,
  Segment,
  StyleProvider,
  Text,
  Toast
} from 'native-base'
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import React, { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'

import getTheme from 'app/native-base-theme/components'
import github from 'app/src/utility/github'
import platform from 'app/native-base-theme/variables/platform'

const { width, height } = Dimensions.get('window')

export default (props) => {
  const { navigation } = props
  const { token } = navigation.state.params
  const [filename, setFilename] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
  }, [])

  const onPressAdd = async () => {
    const status = await github.addGist(makePayload(), token)
    if (status === 201) {
      await Toast.show({
        text: 'Add Successfull',
        buttonText: 'OK',
        type: 'success'
      })
    } else {
      await Toast.show({
        text: 'An Error Occurred',
        buttonText: 'OK',
        type: 'warning'
      })
    }
  }

  const makePayload = () => {
    return JSON.stringify(
      {
        'description': description,
        'public': isPublic,
        'files': {
          [filename]: {
            'content': content
          }
        }
      }
    )
  }

  return (
    <StyleProvider style={getTheme(platform)}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Container>
          <Header hasSegment>
            <Left>
              <Button
                transparent
                onPress={() => { navigation.goBack() }} >
                <Icon name='close' />
              </Button>
            </Left>
            <Body>
              <Segment transparent>
                <Button first active={isPublic} onPress={() => setIsPublic(!isPublic)}><Text>Public</Text></Button>
                <Button last active={!isPublic} onPress={() => setIsPublic(!isPublic)}><Text>Secret</Text></Button>
              </Segment>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => { onPressAdd() }} >
                <Icon type='Feather' name='plus' />
              </Button>
            </Right>
          </Header>
          <Content>
            <Form>
              <Item stackedLabel>
                <Label>Filename</Label>
                <Input
                  value={filename}
                  onChangeText={(text) => setFilename(text)} />
              </Item>
              <Item stackedLabel>
                <Label>Gist description</Label>
                <Input
                  value={description}
                  onChangeText={(text) => setDescription(text)} />
              </Item>
              <Item stackedLabel last style={{ height: height / 2 }}>
                <Label>Content</Label>
                <Input
                  multiline
                  value={content}
                  onChangeText={(text) => setContent(text)} />
              </Item>
            </Form>
          </Content>
        </Container>
      </TouchableWithoutFeedback>
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
