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
  Textarea,
  Title
} from 'native-base';
import {
  Dimensions,
  StyleSheet,
  TextInput
} from 'react-native'
import React, { useState, useEffect } from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'

import { monokai } from 'react-syntax-highlighter/styles/hljs'
import getTheme from 'app/native-base-theme/components'
import github from 'app/src/utility/github'
import platform from 'app/native-base-theme/variables/platform'

const { width, height} = Dimensions.get('window')

export default (props) => {
  const { navigation } = props
  const [filename, setFilename] = useState('')
  const [isPublic, setIsPublic] = useState(true)
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
  }, [])

  const onPressSave = async () => {
  }

  const makePayload = () => {
    return {
      'description': description,
      'public': isPublic,
      'files': {
        [filename]: {
          'content': content
        }
      }
    }
  }

  return (
    <StyleProvider style={getTheme(platform)}>
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
              onPress={() => { navigation.goBack() }} >
              <Text>Add</Text>
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
