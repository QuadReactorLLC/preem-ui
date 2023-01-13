# preem-ui

UI components for React Native that support custom theming.

## Installation

Install the library using yarn:

`yarn add preem-ui`

Or npm:

`npm install --save preem-ui`

## Setting up your theme

Next, wrap your app in a PreemThemeProvider. This allows you specify a common theme for all UI components to use.

```typescript
import { PreemTheme, PreemThemeProvider } from 'preem-ui'

const theme: PreemTheme = {
  dark: true,
  colors: {
    primary: 'green',
    background: '#212121',
    card: '#2f2f2f',
    text: '#fff',
    border: '#282828',
    notification: '#ff6600',
  },
}

export default function App() {
    return (
        <PreemThemeProvider theme={theme}>
            {/* Rest of your app code */}
        <PreemThemeProvider>
    )
}
```

## Usage with `react-navigation`

This library is designed to work with `react-navigation`. Just pass your custom `PreemTheme` as a prop when you create your `NavigationContainer`.

`<NavigationContainer theme={theme}>`

## Components

| Component      | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| Button         | Custom `TouchableOpacity` styled as a simple button.                               |
| Card           | `View` styled to look like a card.                                                 |
| CardList       | Responsive list of cards.                                                          |
| Fab            | Floating action button absolutely positioned in a corner.                          |
| Header         | Simple header text to appear at the top of a screen.                               |
| InnerContainer | View that is locked to a max width.                                                |
| Label          | Styled text to be used in combination with Inputs.                                 |
| Loading        | Centered loading spinner.                                                          |
| OuterContainer | Main container for screens. Supports scrolling and accounts for status bar height. |
| TabBar         | Toggle selector for a small number of items.                                       |
| Table          | Scrollable and sortable table.                                                     |
| Text           | Styled `Text`.                                                                     |
| TextInput      | Styled `TextInput`.                                                                |
