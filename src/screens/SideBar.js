import React, { useEffect } from 'react'
import { Image, FlatList } from 'react-native'
import {
  Text,
  Container,
  ListItem,
  Content
} from 'native-base'

const routes = ['Home']

export default (props) => {
  const { navigation } = props

  useEffect(() => {
    console.log(props)
  }, [])

  return (
    <Container>
      <Content>
        <Image
          source={{
            uri:
            'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png'
          }}
          style={{
            height: 120,
            width: '100%',
            alignSelf: 'stretch',
            position: 'absolute'
          }}
        />
        <Image
          square
          style={{
            height: 80,
            width: 70,
            position: 'absolute',
            alignSelf: 'center',
            top: 20
          }}
          source={{
            uri:
            'https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/logo.png'
          }}
        />
        <Text>{routes}</Text>
        <FlatList
          dataArray={routes}
          contentContainerStyle={{ marginTop: 120 }}
          renderRow={data => {
            return (
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data)}
              >
                <Text>{data}</Text>
              </ListItem>
            )
          }}
        />

      </Content>
    </Container>
  )

}
