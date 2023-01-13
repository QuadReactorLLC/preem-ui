import React, { ReactNode, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'
import Text from './Text'

interface IProps {
  text: string
  children?: ReactNode
}

export default function Header(props: IProps) {
  const { text } = props
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        padding: 16,
        borderBottomColor: theme.colors.border,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      },
      text: {
        fontSize: 22,
      },
    })
  }, [theme])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {props.children}
    </View>
  )
}
