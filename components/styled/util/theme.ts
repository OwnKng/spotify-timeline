import { DefaultTheme } from 'styled-components'

export const theme: DefaultTheme = {
  colors: {
    primary: '#16161e',
    input: '#161C22',
    background: '#0D1117',
    foreground: '#161C21',
    middleground: '#F1F1F8',
    border: '#575C63',
    accent: '#D43F3AFF',
    userInput: '#3d59a144',
    selected: '#8B96A6',
    heading: '#EEF4ED',
    highlight: '#4BB3FD',
    headingHover: '#868bc422',
    primaryText: '#EEF4ED',
    paragraph: '#A6AEBD',
    button: '#4BB3FD',
    buttonText: '#16161E',
    buttonHover: '#3d59a1AA',
  },
  levels: {
    low: 0,
    medium: 1,
    high: 2,
    highest: 3,
  },
}

export const Dark = {
  background: '#1e202e',
  text: '#EEF6FC',
  stroke: '#EEF6FC',
  grid: '#EEF6FC',
}

export const Light = {
  background: '#FFFFFF',
  text: 'black',
  stroke: '#2a2a2a',
  grid: '#2a2a2a',
}

export default theme
