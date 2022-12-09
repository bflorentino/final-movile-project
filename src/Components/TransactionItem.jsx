import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const TransactionItem = ({transaction}) => {

  return (
    <View style={{display:'flex', padding:10, borderBottomWidth: 1}} >
      <Text style={{fontWeight:'bold', marginTop:5, color:'blue'}}> {transaction.descripcion} </Text>
        <View style={{display:'flex', flexDirection:'row', marginTop:5}}>
          <Text>Monto: </Text> 
          <Text style={{marginLeft:5}}> {transaction.monto}</Text>
      </View>
    </View>
  )
}

StyleSheet.create({
  


})

export default TransactionItem