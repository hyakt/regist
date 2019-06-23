import React, { useState, useEffect } from 'react'
import { Image, FlatList } from 'react-native'
import {
  Text,
  Container,
  ListItem,
  Content
} from 'native-base'

const routes = ['Home']

export default (props) => {
  const [user, setUser] = useState(null)
  const { navigation } = props

  useEffect(() => {
    setUser(navigation._childrenNavigation.Home.getParam('user'))
  }, [navigation._childrenNavigation.Home.getParam('user')])

  return (
    <Container>
      <Content>
        {user ?
        <Image
          square
          style={{
            height: 80,
            width: 70,
            position: 'absolute',
            alignSelf: 'center',
            top: 20
          }}
          source={{ uri: user.avatar_url }}
         />
         : <Text>''</Text>}
      </Content>
    </Container>
  )

}
