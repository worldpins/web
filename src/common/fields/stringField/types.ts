export interface TextFieldProps {
  label?: string
  onBlur: () => void
  onChange: (value: string) => void
  onFocus: () => void
  type?: string
  value?: string
}

export interface TextFieldState {
  isFocussed: boolean
}
