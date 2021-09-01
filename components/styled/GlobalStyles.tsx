import { createGlobalStyle } from 'styled-components'
import { normalize } from 'polished'

const GlobalStyles = createGlobalStyle`
${normalize}

:root {
    --color-primary: ${({ theme }) => theme.colors.primary};
    --color-background: ${({ theme }) => theme.colors.background};
    --color-background-fade: ${({ theme }) => theme.colors.backgroundFade};
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
    color: var(--color-heading);
    padding: 0 1rem 0 0;
  }

  body {
    background-image: linear-gradient(180deg, var(--color-background-fade), var(--color-background), var(--color-background), var(--color-background));
    font-family: 'Saira', sans-serif;
    font-weight: 400;
    line-height: 1.75;
    margin: 0px;
    box-sizing: border-box;
    color: var(--color-paragraph);
    max-width: 100vw;
    min-height: 100vh;

    input {
        background: var(--color-input);
        padding: 1rem 5px 5px 5px; 
        border: none;
        border-bottom: 3px solid var(--color-border);
        border-radius: 0px;
        color: var(--color-heading);
        font-size: 1.4rem;
        width: 100%;
      }

    input:focus {
      outline: none;
    }
`

export default GlobalStyles
