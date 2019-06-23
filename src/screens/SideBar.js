import { Container, Content, ListItem, Text, View } from 'native-base';
import { FlatList, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react'

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
         <View style={styles.profileContainer}>
           <Image
             style={styles.icon}
             source={{ uri: user.avatar_url }}
           />
           <Text style={styles.name}> {user.name}</Text>
         </View>
         : <Text>''</Text>
        }
        <FlatList
          data={['logout']}
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
  )
}

const styles = StyleSheet.create({
  profileContainer: {
    backgroundColor: '#24292e',
    paddingVertical: 60,

  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50
  },
  name: {
    color: '#ffffff',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 16
  }
})




