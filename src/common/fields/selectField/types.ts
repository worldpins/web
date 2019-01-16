export interface SelectFieldProps {
  label?: string
  onBlur: () => void
  onChange: (value: string) => void
  onFocus: () => void
  options: Array<{ value: string, label: string }>
  value?: string
}
