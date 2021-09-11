import styled from 'styled-components'
import { elevation } from './util'

export const Button = styled.button/* css */`
    margin: 0px auto;
    background: var(--color-input);
    padding: 10px 20px;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    color: var(--color-heading);
    ${elevation[1]};
`
