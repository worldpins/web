import * as React from 'react';

import styled from '../../../layout/styled';
import { Label } from '../helpers';

import { SelectFieldProps } from './types';

const SelectFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectField = React.memo(({ label, value, onChange, options }: SelectFieldProps) => {
  const change = React.useCallback(
    (e: React.FormEvent<HTMLSelectElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );
  return (
    <SelectFieldWrapper>
      {label && <Label>{label}</Label>}
      <select value={value} onChange={change}>
        {options.map(({ value: optionValue, label: optionLabel }) => (
          <option key={value} value={optionValue}>{optionLabel}</option>
        ))}
      </select>
    </SelectFieldWrapper>
  );
});

export default SelectField;
