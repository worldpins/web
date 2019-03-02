import * as React from 'react';

import styled from '../../../layout/styled';
import { Label } from '../helpers';

import { TextFieldProps } from './types';

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  border-radius: 2px;
  transition: all .25s;
  &:focus {
    background-color: ${({ theme }) => theme.grey};
  }
`;

const TextField: React.FC<TextFieldProps> = (
  { onBlur, label, value, type, onFocus, onChange },
) => {
  const blur = React.useCallback(
    () => {
      if (onBlur && typeof onBlur === 'function') {
        onBlur();
      }
    },
    [onBlur]);
  const focus = React.useCallback(
    () => {
      if (onFocus && typeof onFocus === 'function') {
        onFocus();
      }
    },
    [onFocus]);
  const change = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange]);
  return (
    <TextFieldWrapper>
      {label && <Label>{label}</Label>}
      <TextInput
        onBlur={blur}
        onChange={change}
        onFocus={focus}
        type={type}
        value={value}
      />
    </TextFieldWrapper>
  );
};

export default React.memo(TextField);
