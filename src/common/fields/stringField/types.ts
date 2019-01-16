export interface TextFieldProps {
  label?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  type?: string;
  value?: string;
}
