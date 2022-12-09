import React, { useContext, useEffect, useState } from 'react'
import { TextInput, StyleSheet, Text, View, Modal } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { useForm } from '../hooks/useForm';
import { addFinancialTransaction, getActiveLoans } from '../firebase/Firebase-financial';
import { authContext } from '../../Context/authContext';

const AddTransaction = () => {

    const { auth } = useContext(authContext)

    const [ activeLoans, setActiveLoans ] = useState([])

    const [ formValues, handleInputChanges ] = useForm(
        {
            descripcion: "",
            monto: 0,
            fecha: new Date().toLocaleString(),
            mes:   new Date().getMonth() + 1,
            anio:  new Date().getFullYear(),
            tipo: "Gasto",
            tipo_gasto: 1,
            tipo_ingreso: 1,
            persona: "",
            prestamo:""
        }
    )

    useEffect(() => {
        getActiveLoans(auth.email)
        .then(data => {
            setActiveLoans([...data])
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const onSubmitData = () => {

        const loan = (formValues.tipo === "Gasto" && formValues.tipo_gasto === 3) || (formValues.tipo === "Ingreso" && formValues.tipo_ingreso === 2)
        const LoanPayment = formValues.tipo_gasto === 4 || formValues.tipo_ingreso === 3

        addFinancialTransaction(formValues, auth.email, loan, LoanPayment )
         .then(res => {
             console.log(res)
         })
         .catch(e => {
             console.log(e)
         })
    }

    return(
        <View style={styles.form}>

            <Text style={styles.title}>
                Nueva Transacción
            </Text>

            <TextInput 
                style={styles.input} 
                value={formValues.descripcion}
                onChangeText={(text) => handleInputChanges("descripcion", text)}
                placeholder="Descripción de la Transacción" 
            />
            <TextInput 
                style={styles.input}  
                placeholder="Monto"
                value={formValues.monto}
                onChangeText={(text) => handleInputChanges("monto", text) }
                keyboardType='number-pad'
            />

            <View style={{display:'flex', flexDirection:'row' }}>
                <RadioButton
                    value="Gasto"
                    status={formValues.tipo === "Gasto" ? 'checked' : 'unchecked'}
                    onPress={() => handleInputChanges("tipo", "Gasto")}
                    />
                <Text > Gasto </Text>
            </View>

            <View style={{display:'flex', flexDirection:'row' }}>
                <RadioButton
                    value="Ingreso"
                    status={formValues.tipo === "Ingreso" ? 'checked' : 'unchecked'}
                    onPress={() => handleInputChanges("tipo", "Ingreso")}
                    />
                <Text > Ingreso </Text>
            </View>

            {
                formValues.tipo === "Gasto" &&
                    
                    <Picker
                        selectedValue={formValues.tipo_gasto}
                        onValueChange={(itemValue)  => handleInputChanges("tipo_gasto", parseInt(itemValue))
                    }>
                        <Picker.Item label="Gastos Personales" value={1} />
                        <Picker.Item label="Gastos Por Servicios" value={2} />
                        <Picker.Item label="Prestamo" value={3} />
                        <Picker.Item label="Pago de un Prestamo" value={4} />
                        <Picker.Item label="Gastos Administrativos" value={6} />
                        <Picker.Item label="Gastos Otros" value={7} />
                    </Picker>
            }

            {
                formValues.tipo === "Ingreso" && 

                    <Picker
                        selectedValue={formValues.tipo_ingreso}
                        onValueChange={(itemValue)  => handleInputChanges("tipo_ingreso", parseInt(itemValue))
                    }>
                        <Picker.Item label="Ingresos por Salario" value={1} />
                        <Picker.Item label="Ingreso Por Prestamo" value={2} />
                        <Picker.Item label="Ingreso Por pago de cuota de prestamo" value={3} />
                        <Picker.Item label="Ingresos Otros" value={4}  />

                    </Picker>
            }

            {
                ((formValues.tipo === "Gasto" && formValues.tipo_gasto === 3) || (formValues.tipo === "Ingreso" && formValues.tipo_ingreso === 2))
                    &&
                <TextInput 
                    style={styles.input} 
                    placeholder="Nombre de la Persona involucrada"
                    value={formValues.persona}
                    onChangeText={(text) => handleInputChanges("persona", text)}
                />
            }

            {
                ((formValues.tipo === "Ingreso" && formValues.tipo_ingreso === 3) || (formValues.tipo === "Gasto" && formValues.tipo_gasto === 4))
                    &&
                    <Picker
                        selectedValue={formValues.prestamo}
                        onValueChange={(itemValue)  => handleInputChanges("prestamo", itemValue)
                    }>
                    {activeLoans.map(loan => (
                        <Picker.Item key={loan.id} label={`${loan.persona} => ${loan.balance}`} value={loan.id} />    
                    ))
                    }
                </Picker>
            }
 
                  <TouchableWithoutFeedback style={styles.button} onPress={onSubmitData}>
                    <Text style={styles.textButton}>
                        Registrar Transacción
                    </Text>
                </TouchableWithoutFeedback>

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
})