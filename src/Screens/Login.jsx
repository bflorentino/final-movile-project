import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import { useForm } from '../hooks/useForm';
import { login } from '../firebase/Firebase-auth';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { authContext } from '../../Context/authContext';
import { types } from '../../Context/authReducer';


const Login = () => {

  const [ formValues, handleInputChanges ] = useForm({password: "", email: ""})
  
  const { dispatch } = useContext(authContext)

  console.log(dispatch);

  const navigation = useNavigation();

  const onSubmitData = (e) => {
    e.preventDefault()
    login(formValues.email, formValues.password)
    .then(data => {
      if(data !== false){
        Alert.alert("Bienvenido")
        dispatch({type: types.LOGIN , payload: {...data}})
        navigation.navigate("Home")
      }
    })
  }


return (
    <View style={styles.form}>
        <Text style={styles.title}>
            Inicio de Sesion
        </Text>
      <TextInput 
        placeholder='Correo Electrónico'
        value={formValues.email}
        onChangeText={(text)=>handleInputChanges("email", text)}
        style={styles.input}
      />
      <TextInput 
        placeholder='Contraseña'
        value={formValues.password}
        onChangeText={(text)=>handleInputChanges("password", text)}
        style={styles.input}
        secureTextEntry={true}
      />

      <TouchableWithoutFeedback style={styles.button} onPress={onSubmitData} >
        <Text style={styles.textButton}>
            Iniciar Sesión
        </Text>
    </TouchableWithoutFeedback>
    </View>
  )
}
const styles = StyleSheet.create({
    
    form:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        marginTop:20
    },
    title:{
        fontSize:35,
        fontWeight:'bold'
    },
    input: {
      height: 40,
      width:340,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    button:{
        display:'flex',
        alignSelf:'flex-start',
        justifyContent:'center'
    },
    textButton: {
        backgroundColor:'#20232A',
        color: '#fff',
        paddingVertical:8,
        borderRadius:10,
        paddingHorizontal:20,
        fontSize:20,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 15
    }
  });

export default Login;