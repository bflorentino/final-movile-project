import { View, Text, FlatList } from 'react-native'
import { useContext, useEffect, useState } from 'react'
import { getExpenses, getIncomes } from '../firebase/Firebase-financial'
import React from 'react'
import { authContext } from '../../Context/authContext'
import  TransactionItem  from '../Components/TransactionItem'

export default function ViewTransactions() {
 
  const [transactions, setTransactions] = useState([])
  const [transactionTypes, setTransactionsType] = useState(2)
  const [filteredTransaction, setfilteredTransaction] = useState([])

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
  }, [])
 
  return (
  
    
      <FlatList 

        data={transactions}
        itemSeparatorComponent={() => <View> </View>}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
      >

      </FlatList>    
    
  )
}