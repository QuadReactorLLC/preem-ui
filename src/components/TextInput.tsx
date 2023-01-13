import React, { useMemo } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'

export default function PreemTextInput(props: TextInputProps) {
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        color: theme.colors.text,
        fontSize: 18,
        width: '100%',
        padding: 10,
        backgroundColor: theme.colors.card,
        borderRadius: 4,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderStyle: 'solid',
      },
    })
  }, [theme])

  return <TextInput {...props} style={[styles.text, props.style]} />
}
