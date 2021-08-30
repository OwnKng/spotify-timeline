import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyles = createGlobalStyle`
${normalize}

:root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-background: ${({ theme }) => theme.colors.background};
    --color-foreground: ${({ theme }) => theme.colors.foreground};
    --color-middleground: ${({ theme }) => theme.colors.middleground};
    --color-border: ${({ theme }) => theme.colors.border};
    --color-accent: ${({ theme }) => theme.colors.accent};
    --color-input: ${({ theme }) => theme.colors.input};
    --color-input-selected: ${({ theme }) => theme.colors.selected};
    --color-paragraph: ${({ theme }) => theme.colors.paragraph};
    --color-heading: ${({ theme }) => theme.colors.heading};
    --color-headingHover: ${({ theme }) => theme.colors.headingHover};
    --color-button: ${({ theme }) => theme.colors.button};
    --color-button-text: ${({ theme }) => theme.colors.buttonText};
    --color-selected: ${({ theme }) => theme.colors.selected};
    --color-button-hover: ${({ theme }) => theme.colors.buttonHover};
    --levels-highest: ${({ theme }) => theme.levels.highest}; 
    --color-highlight: ${({ theme }) => theme.colors.highlight};
    --color-primary-text: ${({ theme }) => theme.colors.primaryText};
   }

  html {font-size: 100%} /*16px*/

  h1, h2 {
    color: var(--color-background);
    background: var(--color-heading);
    padding: 0 1rem 0 0;
  }

  .title {
    display: flex; 
  }

  body {
    background: var(--color-background);
    font-family: 'Saira', sans-serif;
    font-weight: 400;
    line-height: 1.75;
    margin: 0px;
    box-sizing: border-box;
    color: var(--color-paragraph);
    max-width: 100vw;

    input {
      width: 100%;
      background: var(--color-input);
      border: 1px solid var(--color-border);
      border-radius: 3px;
      color: var(--color-paragraph);
      padding: 1rem 0rem;
    }

    input:focus {
      outline: none;
    }
`

export default GlobalStyles
