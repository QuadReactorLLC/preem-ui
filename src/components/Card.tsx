import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'

export default function Card(props: ViewProps) {
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      card: {
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderRadius: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        marginBottom: 15,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      },
    })
  }, [theme])

  return <View {...props} style={[styles.card, props.style]} />
}
