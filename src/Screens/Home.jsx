import { View, Text } from 'react-native'
import React from 'react'
import { authContext } from '../../Context/authContext'
import { useContext } from 'react'

const Home = () => {

    const { auth } = useContext(authContext)

    console.log(auth);

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home