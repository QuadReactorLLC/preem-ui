import React, { ReactNode, useMemo } from 'react'
import { Image, ImageSourcePropType, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { usePreemTheme } from '../ThemeProvider'
import Text from './Text'

interface ButtonProps {
  disabled?: boolean
  icon?: ImageSourcePropType
  iconComponent?: ReactNode
  onPress?(): void
  style?: StyleProp<ViewStyle>
  title: string
  textStyle?: StyleProp<TextStyle>
}

export default function PreemButton(props: ButtonProps) {
  const { disabled, icon, iconComponent, title, style, onPress, textStyle } = props
  const theme = usePreemTheme()

  const styles = useMemo(() => {
    return StyleSheet.create({
      button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        height: 45,
        justifyContent: 'center',
        marginTop: 5,
        flexDirection: 'row',
      },
      buttonText: {
        fontSize: 16,
        color: '#fff',
      },
      disabled: {
        opacity: 0.4,
      },
    })
  }, [theme])

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, disabled ? styles.disabled : {}, style]} disabled={disabled}>
      {icon && <Image style={{ height: 24, width: 24, marginRight: 8 }} source={icon} />}
      {!!iconComponent && <View style={{ marginRight: 8 }}>{iconComponent}</View>}
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}
