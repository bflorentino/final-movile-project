import React from 'react';
import Constants from 'expo-constants'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import Navigation from '../Navigation';

const Register = () => {

    return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={styles.input}>Home!</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });


export default Register;