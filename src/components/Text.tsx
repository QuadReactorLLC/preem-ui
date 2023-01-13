import React, { useMemo } from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'

export default function PreemText(props: TextProps) {
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      text: {
        color: theme.colors.text,
      },
    })
  }, [theme])

  return <Text {...props} style={[styles.text, props.style]} />
}
