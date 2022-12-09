import React from 'react'
import {View, Text} from 'react-native'

const TransactionItem = ({transaction}) => {

  return (
    <View>
    <Text>{transaction.descripcion}</Text>
    <Text>{transaction.monto}</Text>
    </View>
  )
}

export default TransactionItem