import { Container, Content, ListItem, Text, View, StyleProvider } from 'native-base'
import { FlatList, Image, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'

import getTheme from 'app/native-base-theme/components'
import platform from 'app/native-base-theme/variables/platform'

export default (props) => {
  const [user, setUser] = useState(null)
  const { navigation } = props

  useEffect(() => {
    setUser(navigation._childrenNavigation.Home.getParam('user'))
    console.log(navigation._childrenNavigation.Home.getParam('user'))
  }, [navigation._childrenNavigation.Home.getParam('user')])

  return (
    <StyleProvider style={getTheme(platform)}>
      <Container>
        <Content>
          {user ?
           <View style={styles.profileContainer}>
             <Image
               style={styles.icon}
               source={{ uri: user.avatar_url }}
             />
             <View style={styles.nameContainer}>
               <Text style={styles.name}>{user.name}</Text>
               <Text style={styles.loginName}>{user.login}</Text>
             </View>
           </View>
           : <View></View>
          }
          <FlatList
            data={['Logout', 'Acknowledgement']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <ListItem>
                  <Text>{item}</Text>
                </ListItem>
              )
            }} />
        </Content>
      </Container>
    </StyleProvider>
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    paddingVertical: 60
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50
  },
  nameContainer: {
    alignItems: 'center',
    marginTop: 16
  },
  name: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  loginName: {
    color: '#ffffff'
  }
})
