import styled from 'styled-components'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

const colorsButton = {
  primary: 'purple',
  secondary: 'orange',
  danger: 'red',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  margin: 1rem;
  border: none;
  border-radius: 0.875rem;
  cursor: pointer;

  background-color: ${(props) => props.theme['yellow-500']};
  color: ${(props) => props.theme};

  /* ${(props) => `background-color: ${colorsButton[props.variant]}`} */
`
