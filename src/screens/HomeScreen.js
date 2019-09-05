import React, { useState, useEffect } from 'react'
import {
  AsyncStorage,
  Dimensions,
  FlatList,
  RefreshControl,
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
  Fab,
  Header,
  Icon,
  Left,
  Right,
  StyleProvider,
  Text as NBText
} from 'native-base'

import * as naviHooks from 'react-navigation-hooks'

import 'abortcontroller-polyfill'

import _ from 'lodash'

import getTheme from 'app/native-base-theme/components'
import platform from 'app/native-base-theme/variables/platform'

import invert from 'invert-color'
import github from 'app/src/utility/github'
import lang from 'app/src/constants/Languages'

const width = Dimensions.get('window').width

export default (props) => {
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  const [gists, setGists] = useState()
  const [articles, setArticles] = useState([])
  const [isFetching, setIsFecthing] = useState(false)
  const [isFetchingGists, setIsFetchingGists] = useState(false)
  const [isFetchingArticles, setIsFetchingArticles] = useState(false)
  const [signal, setSignal] = useState()
  const [sortByCreated, setSortByCreated] = useState(true)
  const { navigation } = props

  // tokenを取得
  useEffect(() => {
    const abortController = new window.AbortController()
    setSignal(abortController.signal)

    _fetchToken()
    _getStorageArticles()

    return function cleanup () { abortController.abort() }
  }, [])

  // tokenが更新された時に処理実行
  useEffect(() => {
    _getUser()
    navigation.setParams({ token: token })
  }, [token])

  useEffect(() => {
    _getGist()
  }, [user])

  useEffect(() => {
    _getArticles()
  }, [gists])

  useEffect(() => {
    setArticles(sortByArticles(articles))
  }, [sortByCreated])

  naviHooks.useNavigationEvents(evt => {
    if (evt.type === 'action') _getGist()
  })

  const _onRefresh = async () => {
    await setIsFecthing(true)
    await _getGist()
    await setIsFecthing(false)
  }

  const _getStorageArticles = async () => {
    const storagedArticles = await AsyncStorage.getItem('articles')
    await setArticles(JSON.parse(storagedArticles))
  }

  const _fetchToken = async () => {
    setToken(await AsyncStorage.getItem('token'))
  }

  const _getUser = async () => {
    const storedUser = await AsyncStorage.getItem('user')
    if (storedUser == null) {
      if (token != null) {
        const user = await github.getUser(token, signal)
        await setUser(user)
        await navigation.setParams({ user: user })
        await AsyncStorage.setItem('user', JSON.stringify(user))
      }
    } else {
      const user = JSON.parse(storedUser)
      await setUser(user)
      await navigation.setParams({ user: user })
    }
  }

  const _getGist = async () => {
    if (!isFetchingGists && token != null && user != null) {
      await setIsFetchingGists(true)
      const gists = await github.getUserGists(user.login, token, signal)
      await setGists(gists)
      await setIsFetchingGists(false)
    }
  }

  const _getArticles = async () => {
    if (!isFetchingArticles && gists != null) {
      await setIsFetchingArticles(true)
      let articles = await Promise.all(
        gists.map(gist => {
          return Promise.all(
            Object.values(gist.files).map(async (file, index) => {
              const a = await github.getGistArticle(file.raw_url, token, signal)
              file['content'] = a
              file['shorthand'] = a.replace(/\r?\n/g, '').substr(0, 50)
              file['color'] = lang[file.language] ? lang[file.language].color ? lang[file.language].color : '#ccc' : '#ccc'
              file['bwcolor'] = invert(file.color, true)
              file['id'] = gist.id
              file['description'] = gist.description
              file['public'] = gist.public
              file['token'] = token
              file['index'] = index + 1
              file['size'] = Object.values(gist.files).length
              file['created_at'] = gist.created_at
              file['updated_at'] = gist.updated_at
              return file
            }))
        })
      )
      articles = await sortByArticles(_.flatten(articles))
      await setArticles(articles)
      AsyncStorage.setItem('articles', JSON.stringify(articles))
      await setIsFetchingArticles(false)
    }
  }

  const sortByArticles = (articles) => {
    return sortByCreated ? _.orderBy(articles, ['created_at'], ['desc']) : _.orderBy(articles, ['updated_at'], ['desc'])
  }

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => { navigation.openDrawer() }} >
              <Icon name='menu' />
            </Button>
          </Left>
          <Right>
            <Button transparent onPress={() => setSortByCreated(!sortByCreated)}>
              <Icon type='FontAwesome' name='sort' style={{ fontSize: 14 }} />
              <Text style={styles.sortText}> { sortByCreated ? ' created' : 'updated' }</Text>
            </Button>
          </Right>
        </Header>
        <Content padder refreshControl={
          <RefreshControl
            tintColor='#a6e22e'
            refreshing={isFetching}
            onRefresh={_onRefresh}
            title='Fetching...'
            titleColor='#a6e22e'
          />}>
          <FlatList
            numColumns={1}
            data={articles}
            keyExtractor={item => item.raw_url}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Text style={{ color: '#66d9ef', fontSize: 16, marginTop: 10 }}>You don’t have any gists yet.</Text>
              </View>
            }
            renderItem={({ item }) => {
              return (
                <Card button last style={styles.card} >
                  <CardItem header style={styles.cardHeader} bordered button onPress={(c) => navigation.navigate('Edit', { article: item, token: token })} >
                    <View style={{ flex: 4 }}>
                      <Text style={styles.headerText}>
                        <Text style={{ color: item.color }}>■</Text> {item.filename}
                        {item.size > 1 ? <Text style={styles.headerCounts}> id:{item.id.substr(0, 5)} ({item.index}/{item.size})</Text> : <Text />}
                      </Text>
                    </View>
                    {item.public
                      ? <View />
                      : <View style={styles.secretBadge}>
                        <Text style={styles.secretBadgeText}>Secret</Text>
                      </View>
                    }
                  </CardItem>
                  <CardItem>
                    <Body>
                      <View>
                        <Text>{item.shorthand}</Text>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              )
            }} />
        </Content>
        { isFetchingGists
          ? <View style={styles.progressContainer}>
            <Text style={styles.progressText}>fetching gists...</Text>
          </View>
          : isFetchingArticles
            ? <View style={styles.progressContainer}>
              <Text style={styles.progressText}>fetching articles...</Text>
            </View>
            : <View />
        }
        <Fab
          active
          direction='up'
          style={{ backgroundColor: '#f92672' }}
          position='bottomRight'
          onPress={() => navigation.navigate('Add', { token: token })}>
          <Icon type='Feather' name='plus' />
        </Fab>
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
  headerCounts: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#999'
  },
  card: {
    width: width
  },
  secretBadge: {
    flex: 1,
    paddingVertical: 1,
    marginRight: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#75715e',
    alignItems: 'center'
  },
  secretBadgeText: {
    color: '#75715e',
    fontSize: 12,
    fontWeight: 'bold'
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
  sortText: {
    fontSize: 12,
    color: '#66d9ef'
  }
})
