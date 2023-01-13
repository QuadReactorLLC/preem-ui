import React, { ReactNode } from 'react'
import { View } from 'react-native'
import Text from './Text'

interface Props {
  text: string
  children?: ReactNode
}

export default function Label(props: Props) {
  return (
    <View style={{ paddingBottom: 12 }}>
      <Text style={{ marginBottom: 8, fontSize: 18 }}>{props.text}</Text>
      {props.children}
    </View>
  )
}
