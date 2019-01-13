import * as React from 'react';

import styled from '../../../layout/styled';
import { Label } from '../helpers';

import { TextFieldProps, TextFieldState } from './types';

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FocussedLabel = styled(Label)``;

const TextInput = styled.input`
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  border-radius: 2px;
  transition: all .25s;
  &:focus {
    background-color: ${({ theme }) => theme.grey};
  }
`;

class TextField extends React.PureComponent<TextFieldProps, TextFieldState> {

  state = { isFocussed: false }

  onChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.onChange(e.currentTarget.value);
  }

  onFocus = (e: React.SyntheticEvent) => {
    const { onFocus } = this.props;
    this.setState({ isFocussed: true });
    if (onFocus && typeof onFocus === 'function') {
      onFocus();
    }
  }

  onBlur = (e: React.SyntheticEvent) => {
    const { onBlur } = this.props;
    this.setState({ isFocussed: false });
    if (onBlur && typeof onBlur === 'function') {
      onBlur();
    }
  }

  render() {
    const { label, value, type } = this.props;
    const { isFocussed } = this.state;
    return (
      <TextFieldWrapper>
        {label && (isFocussed ?
          <FocussedLabel>{label}</FocussedLabel> :
          <Label>{label}</Label>
        )}
        <TextInput
          onBlur={this.onBlur}
          onChange={this.onChange}
          onFocus={this.onFocus}
          type={type}
          value={value}
        />
      </TextFieldWrapper>
    )
  }
}

export default TextField;
