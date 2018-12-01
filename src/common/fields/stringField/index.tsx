import * as React from 'react';
import styled from 'styled-components';

import { Label } from '../helpers';

import { TextFieldProps, TextFieldState } from './types';

const TextFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// TODO
const FocussedLabel = styled(Label)``;

const TextInput = styled.input`
  border: 0;
  border-bottom: 1px solid blue;
  border-radius: 2px;
  transition: all .25s;
  &:focus {
    background-color: grey;
  }
`;

class TextField extends React.Component<TextFieldProps, TextFieldState> {

  public state = { isFocussed: false }

  public onChange = (e) => {
    this.props.onChange(e.target.value);
  }

  public onFocus = (e) => {
    const { onFocus } = this.props;
    this.setState({ isFocussed: true });
    if (onFocus && typeof onFocus === 'function') {
      onFocus();
    }
  }

  public onBlur = (e) => {
    const { onBlur } = this.props;
    this.setState({ isFocussed: false });
    if (onBlur && typeof onBlur === 'function') {
      onBlur();
    }
  }

  public render() {
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
