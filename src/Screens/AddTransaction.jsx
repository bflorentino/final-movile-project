import React, { useState } from 'react'
import { TextInput, StyleSheet, Text, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

const AddTransaction = () => {

    const [date, setDate] = useState(new Date())

    return(
        <View style={styles.form}>

            <Text style={styles.title}>
                Nueva Transacción
            </Text>

            <TextInput 
                style={styles.input} 
                placeholder="Descripción de la Transacción" 
            />
            <TextInput 
                style={styles.input}  
                placeholder="Monto"
                keyboardType='number-pad'
            />

            <DateTimePicker />

        </View>
    )
}

export default AddTransaction

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
})