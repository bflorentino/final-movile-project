import React, { useContext, useEffect, useState } from 'react'
import { TextInput, StyleSheet, Text, View, Modal, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RadioButton } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import { useForm } from '../hooks/useForm';
import { addFinancialTransaction, getActiveLoans } from '../firebase/Firebase-financial';
import { authContext } from '../../Context/authContext';
import { useNavigation } from '@react-navigation/native';

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const dias = new Array(31).fill(1).map((day, i) => i)

const AddTransaction = () => {

    const history = useNavigation()

    const { auth } = useContext(authContext)

    const [ activeLoans, setActiveLoans ] = useState([])

    const [ formValues, handleInputChanges ] = useForm(
        {
            descripcion: "",
            monto: "",
            fecha: new Date().toLocaleString(),
            mes:   new Date().getMonth(),
            anio:  new Date().getFullYear(),
            dia:   new Date().getDate(),
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
        const loanPayment = formValues.tipo_gasto === 4 || formValues.tipo_ingreso === 3

        if(formValues.descripcion === ""){
            Alert.alert("Agregue una descripcion")
            return
        }

        try{
            parseFloat(formValues.monto)
        }catch(e){
            Alert.alert("Agreue un valor valido al monto")
            return
        }

        if(loan && formValues.persona === ""){
            Alert.alert("Agregue una descripcion")
            return
        }

        if(loanPayment && formValues.prestador === ""){
            Alert.alert("Seleccione un préstamo")
            return
        }

        addFinancialTransaction(formValues, auth.email, loan, loanPayment )
         .then(res => {
             console.log(res)
             history.navigate("ViewTransactions")
             Alert.alert("Su transacción se ha registrado correctamente")
            })
            .catch(e => {
                console.log(e)
                Alert.alert("Hubo un error al registrar la transacción")
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

            <View style={{display:'flex', flexDirection:'row'}}>

            <Picker
                selectedValue={formValues.dia}
                style={styles.pickerStyle}
                onValueChange={(itemValue)=> handleInputChanges("dia", parseInt(itemValue)) }
            >
          {
              dias.map((d, i) => (
                  <Picker.Item key={d} label={d} value={d} />
                  ))
                }
        </Picker>

            <Picker
                selectedValue={formValues.mes}
                style={styles.pickerStyle}
                onValueChange={(itemValue)=> handleInputChanges("mes", parseInt(itemValue)) }
                >
            {
                months.map((m, i) => (
                    <Picker.Item key={m} label={m} value={parseInt(i)} />
                    ))
                }
            </Picker>
            
      <Picker
          selectedValue={formValues.anio}
          style={styles.pickerStyle}
          onValueChange={(itemValue)=> handleInputChanges("anio", itemValue) }
          >
          {
              [2022, 2023, 2024, 2025, 2026].map((y, i) => (
                  <Picker.Item key={y} label={y} value={y} />
                  ))
                }
        </Picker>
        </View>

            <View style={{display:'flex', flexDirection:'row', width:340, marginTop:15}}>
                <View style={{display:'flex', flexDirection:'row',alignItems:'center'  }}>
                    <RadioButton
                        value="Gasto"
                        status={formValues.tipo === "Gasto" ? 'checked' : 'unchecked'}
                        onPress={() => handleInputChanges("tipo", "Gasto")}
                        />
                    <Text > Gasto </Text>
                </View>

                <View style={{display:'flex', flexDirection:'row', marginLeft:10, alignItems:'center' }}>
                    <RadioButton
                        value="Ingreso"
                        status={formValues.tipo === "Ingreso" ? 'checked' : 'unchecked'}
                        onPress={() => handleInputChanges("tipo", "Ingreso")}
                        />
                    <Text > Ingreso </Text>
                </View>
            </View>

            {
                formValues.tipo === "Gasto" &&
                    
                    <Picker
                        selectedValue={formValues.tipo_gasto}
                        style={{width:340, height:30, marginTop:15}}
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
                        style={{width:340, height:30, marginTop:15}}
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
                    <>
                        <Text style={{marginTop:15, fontSize:15}}>Seleccione un Prestamo</Text>
                        <Picker
                            selectedValue={formValues.prestamo}
                            style={{width:340, height:30, marginTop:10}}
                            onValueChange={(itemValue)  => handleInputChanges("prestamo", itemValue)
                        }>
                        {activeLoans.map(loan => (
                            <Picker.Item key={loan.id} label={`${loan.persona} => ${loan.balance}`} value={loan.id} />    
                            ))
                        }
                    </Picker>
                </>
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
    },
    pickerStyle:{  
        height: 30,  
        width: 110,  
        color: '#344953',  
        justifyContent: 'center',  
        marginLeft:10
    } 
})