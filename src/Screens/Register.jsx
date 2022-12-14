import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native'
import { loadImageFromGallery } from '../helpers/loadImage';
import { Avatar } from 'react-native-paper' 
import { useForm } from '../hooks/useForm';
import { addImage, addLeftDataFromUser, registerUser } from '../firebase/Firebase-auth';
import { useNavigation } from '@react-navigation/native';
import { authContext } from '../../Context/authContext';
import { useContext } from 'react';
import { types } from '../../Context/authReducer';

const Register = () => {

    const navigation = useNavigation();
    const {dispatch} = useContext(authContext);

    const [ formValues, handleInputChanges ] = useForm({
        name:"",
        lastName: "",
        email: "",
        password: "",
    })

    const [ imageSelected, setImageSelected ] = useState(null)

    const selectImage = async () => {

        const response = await loadImageFromGallery([4, 3])

        if(!response.status){
            Alert.alert("No se ha seleccionado ninguna imagen")
            return
        }
        setImageSelected({...response.image})
    }

    const onSubmitData = () => {

        if(formValues.name === ""){
            Alert.alert("Agregue Su nombre")
            return
        }

        if(formValues.lastName === ""){
            Alert.alert("Agregue su apellido")
            return
        }

        if(formValues.email === ""){
            Alert.alert("Correo Invalido")
            return
        }

        if(formValues.password.length < 5){
            Alert.alert("La contraseña debe tener al menos 5 caracteres")
            return
        }

        const imageToUpload = imageSelected?.uri || null

        addImage(imageToUpload, 'profilePics')
        .then(url => {
            registerUser(`${formValues.name} ${formValues.lastName}`, formValues.email, formValues.password, url)

            .then(data => {
                dispatch({type: types.LOGIN , payload: {...data}})
                addLeftDataFromUser({...formValues, url})
                .then(res => {
                    Alert.alert("Se ha registrado exitosamente")
                    navigation.navigate("ViewTransactions")
                }).catch(e => {
                    console.log(e)
                    Alert.alert(e)
                })
            }).catch(e => {
                console.log(e)
                Alert.alert(e)
            })
        }).catch(e => {
            console.log(e)
            Alert.alert(e)
        })
    }

    return (
    <View style={styles.form}>
        <Text style={styles.title}>
            Nueva Cuenta
        </Text>
      <TextInput 
        placeholder='Nombre'
        value={formValues.name}
        onChangeText={(text)=>handleInputChanges("name", text)}
        style={styles.input}
      />
      <TextInput 
        placeholder='Apellido'
        value={formValues.lastName}
        onChangeText={(text)=>handleInputChanges("lastName", text)}
        style={styles.input}
      />
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
      <TouchableOpacity
          style={styles.uploadView}
          onPress={()=>selectImage()}
      >
          <Avatar.Image
              size={150}
              source={imageSelected && imageSelected.uri}
          />
          <Text style={styles.uploadTxt}> {'Subir imagen de perfil'}</Text>
      </TouchableOpacity>

      <TouchableWithoutFeedback style={styles.button} onPress={onSubmitData}>
        <Text style={styles.textButton}>
            Registrarme
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
        backgroundColor:'#159',
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


export default Register;