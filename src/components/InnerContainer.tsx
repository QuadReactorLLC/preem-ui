import React, { useMemo } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'

export default function InnerContainer(props: ViewProps) {
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        maxWidth: 600,
        width: '100%',
        padding: 16,
      },
    })
  }, [theme])

  return <View {...props} style={[styles.container, props.style]} />
}
