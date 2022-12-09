import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { getExpenses, getIncomes } from '../firebase/Firebase-financial'
import React from 'react'
import { authContext } from '../../Context/authContext'
import  TransactionItem  from '../Components/TransactionItem'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Picker } from '@react-native-picker/picker'

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export default function ViewTransactions() {
 
  const [transactions, setTransactions] = useState([])
  const [transactionTypes, setTransactionsType] = useState(1)
  const [filteredTransaction, setfilteredTransaction] = useState([])

  const [ month, setMonth] = useState(new Date().getMonth() + 1)
  const [ year, setYear] = useState(new Date().getFullYear())

  const { auth } = useContext(authContext)

  useEffect(() => {
    if (transactionTypes === 1) {
      getIncomes(auth.email)
        .then((response) => {
          setTransactions(response)
          console.log(response)
        }).catch(e => {
          console.log(e)
        })
    } 
    
    else {
    getExpenses(auth.email)
    .then((response) => {
      setTransactions(response)
      console.log(response)
    }).catch(e => {
      console.log(e)
    })}
  }, [transactionTypes])

  useEffect(() => {
    console.log(month)
    console.log(year)
    setfilteredTransaction(transactions.filter(tr => tr.anio === year && tr.mes === month))
  }, [transactions, year, month])

  useEffect(()=> {
    console.log(filteredTransaction)
  }, [filteredTransaction])

  const onChangeMode = (mode) => {
    setTransactionsType(mode)
  }
 
  return (
    <View style={{padding:10, width:"100%"}}>
      <Text style={{fontSize:25, fontWeight:'bold'}}>Transacciones Registradas</Text>

      <View style={{display:'flex', flexDirection:'row', marginTop:10}}>
      <Picker
          selectedValue={month}
          onValueChange={(itemValue)=> setMonth(itemValue) }
          >
          {
            months.map((m, i) => (
              <Picker.Item key={m} label={m} value={parseInt(i + 1)} />
            ))
          }
        </Picker>

      <Picker
          selectedValue={year}
          style={styles.pickerStyle}
          onValueChange={(itemValue)=> setYear(parseInt(itemValue)) }
          >
          {
            [2022, 2023, 2024, 2025, 2026].map((y, i) => (
              <Picker.Item key={y} label={y} value={y} />
              ))
            }
        </Picker>
      </View>

      <View style={styles.buttonsSection}>
        <TouchableWithoutFeedback onPress={()=>onChangeMode(1)} style={[transactionTypes === 1 && styles.modeSelected, styles.button]}  >
          <Text> Ver Ingresos</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={()=>onChangeMode(2)} style={[transactionTypes === 2 && styles.modeSelected, styles.button]} >
          <Text> Ver Gastos</Text>
        </TouchableWithoutFeedback>
      </View>

      {
        filteredTransaction.length > 0 ?

          <FlatList 
            data={filteredTransaction}
            itemSeparatorComponent={() => <View> </View>}
            renderItem={({ item }) => <TransactionItem transaction={item} />}
          >
          </FlatList>    
        :
         <Text style={{textAlign:'center', fontSize:16, marginTop:20}}>No hay transacciones encontradas para este mes</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  
  modeSelected : {
    backgroundColor : '#cecece'
  },

  buttonsSection: {
    display:'flex',
    flexDirection:'row',
    marginTop:10,
  },
  button:{
    paddingHorizontal: 20,
    paddingVertical: 7
  },

  pickerStyle:{  
    height: 20,  
    width: "80%",  
    color: '#344953',  
    justifyContent: 'center',  
    marginLeft:10
}  
})