interface Option { value: string; label: string; }

export interface SelectFieldProps {
  label?: string;
  onBlur: () => void;
  onChange: (value: string) => void;
  onFocus: () => void;
  options: Option[];
  value?: string;
}
