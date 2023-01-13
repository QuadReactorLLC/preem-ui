import React, { useMemo } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'

interface LoadingProps {
  message?: string
}

export default function Loading(props: LoadingProps) {
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    })
  }, [theme])

  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.colors.text} />
      {props.message && <Text style={{ color: 'white', fontSize: 18 }}>{props.message}</Text>}
    </View>
  )
}
