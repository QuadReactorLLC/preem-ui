import React, { useMemo } from 'react'
import { Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, View, ViewProps } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'

export interface IOuterContainerProps extends ViewProps {
  canScroll?: boolean
  statusBarPadding?: boolean
}

export default function OuterContainer(props: IOuterContainerProps) {
  const { canScroll, statusBarPadding } = props
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    let paddingTop = 0
    if (statusBarPadding && Platform.OS === 'android') {
      paddingTop = StatusBar.currentHeight || 0
    }
    return StyleSheet.create({
      container: {
        alignItems: 'center',
        flex: 1,
      },
      safe: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop,
      },
    })
  }, [theme, statusBarPadding, Platform.OS, StatusBar.currentHeight])

  function renderView() {
    const view = <View style={[styles.container, props.style]} {...props} />
    if (canScroll) {
      return <ScrollView>{view}</ScrollView>
    }
    return view
  }

  return <SafeAreaView style={styles.safe}>{renderView()}</SafeAreaView>
}
