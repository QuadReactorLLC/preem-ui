import React, { createContext, useContext, useReducer } from 'react'

interface ReactNavigationTheme {
  dark: boolean
  colors: {
    primary: string
    background: string
    card: string
    text: string
    border: string
    notification: string
  }
}

export interface PreemTheme extends ReactNavigationTheme {}

const darkBlueTheme: PreemTheme = {
  dark: true,
  colors: {
    primary: '#2a90fd',
    background: '#171b24',
    card: '#202632',
    text: '#fff',
    border: '#000',
    notification: '#2a90fd',
  },
}

type Action = { type: 'setTheme'; payload: PreemTheme }

const ThemeContext = createContext<[PreemTheme, React.Dispatch<Action>] | null>(null)

const reducer = (theme: PreemTheme, action: Action): PreemTheme => {
  switch (action.type) {
    case 'setTheme':
      return action.payload
    default:
      return theme
  }
}

export const PreemThemeProvider = (props: { children: any; theme?: PreemTheme }) => {
  const { children, theme } = props
  const themeReducer = useReducer(reducer, theme || darkBlueTheme)
  return <ThemeContext.Provider value={themeReducer}>{children}</ThemeContext.Provider>
}

export const usePreemTheme = (): PreemTheme => {
  if (!!ThemeContext) {
    const context = useContext(ThemeContext)
    return !!context ? context[0] : darkBlueTheme
  }
  return darkBlueTheme
}

export const useSetPreemTheme = (): React.Dispatch<Action> | null => {
  if (!!ThemeContext) {
    const context = useContext(ThemeContext)
    return !!context ? context[1] : null
  }
  return null
}
