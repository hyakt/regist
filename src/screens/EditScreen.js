import React, { useState } from 'react'
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  StyleProvider,
  Text,
  Title,
  Toast
} from 'native-base'
import { Dimensions, StyleSheet, TextInput, View } from 'react-native'

import Modal from 'react-native-modal'
import SyntaxHighlighter from 'react-native-syntax-highlighter'

import { monokai } from 'react-syntax-highlighter/styles/hljs'
import getTheme from 'app/native-base-theme/components'
import github from 'app/src/utility/github'
import platform from 'app/native-base-theme/variables/platform'

const width = Dimensions.get('window').width

export default (props) => {
  const { navigation } = props
  const { token, article } = navigation.state.params

  const [editable, setEditable] = useState(false)
  const [content, setContent] = useState(article.content)
  const [editing, setEditing] = useState(article.content)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isConfirmDelete, setIsConfirmDelete] = useState(false)

  const onPressSave = async () => {
    await setIsUpdating(true)
    const status = await github.updateGist(article.id, makePayload(), token)
    await setEditable(!editable)
    await setIsUpdating(false)
    if (status === 200) {
      await setEditing(content)
      await Toast.show({
        text: 'Update Successfull',
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

  const onPressDelete = async () => {
    await setIsDeleting(true)
    const status = await github.deleteGist(article.id, article.token)
    await setIsDeleting(false)
    if (status === 204) {
      await Toast.show({
        text: 'Delete Successfull',
        buttonText: 'OK',
        type: 'success'
      })
      navigation.goBack()
    } else {
      await Toast.show({
        text: 'An Error Occurred',
        buttonText: 'OK',
        type: 'warning'
      })
    }
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
                <Icon name='close' />
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
                <Icon type='MaterialCommunityIcons' name='content-save-edit' />
              </Button>
            </Right>
            : <Right>
              <Button transparent onPress={() => setIsConfirmDelete(true)}>
                <Icon type='MaterialCommunityIcons' name='delete-forever' />
              </Button>
              <Button transparent onPress={() => setEditable(!editable)}>
                <Icon type='MaterialCommunityIcons' name='square-edit-outline' />
              </Button>
            </Right>
          }
        </Header>
        <Content
          contentContainerStyle={{ flex: 1 }}>
          {editable
            ? <TextInput
              value={content}
              multiline
              style={{ paddingLeft: 8, lineHeight: 19 }}
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
        { isUpdating
          ? <View style={styles.progressContainer}>
            <Text style={styles.progressText}>Updating...</Text>
          </View>
          : isDeleting
            ? <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Deleting...</Text>
            </View>
            : <View />
        }
        <Modal
          isVisible={isConfirmDelete}
          backdropOpacity={0.8}
          animationIn='zoomInDown'
          animationOut='zoomOutUp'>
          <View style={styles.modalContainer}>
            <Text style={styles.message}>Are you sure?</Text>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
              <Button transparent style={{ paddingHorizontal: 20 }} onPress={() => setIsConfirmDelete(false)}>
                <Text>No</Text>
              </Button>
              <Button danger transparent style={{ paddingHorizontal: 20 }} onPress={() => {
                setIsConfirmDelete(false)
                onPressDelete()
              }}>
                <Text style={{ fontWeight: 'bold' }}>Delete it</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </Container>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30
  },
  headerText: {
    fontWeight: 'bold'
  },
  card: {
    width: width / 2
  },
  progressContainer: {
    width: width,
    position: 'absolute',
    bottom: 22,
    left: 20
  },
  progressText: {
    color: '#a6e22e',
    fontWeight: 'bold'
  },
  modalContainer: {
    height: 200,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  message: {
    fontSize: 18,
    color: '#000',
    marginTop: 70,
    alignSelf: 'center',
    justifyContent: 'center'
  }
})
