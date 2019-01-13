import * as React from 'react';
import { Field, Form } from 'hooked-form';

import StringField from '../../common/fields/stringField';
import styled from '../../layout/styled';
import Button from '../../common/button';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  margin-right: 24px;
  > * {
    margin-bottom: 6px;
  }
`;

const LoginForm = ({ handleSubmit }: { handleSubmit: () => void }) => (
  <FormWrapper onSubmit={handleSubmit}>
    <h1>Login</h1>
    <Field
      component={StringField}
      fieldId="email"
      label="email"
    />
    <Field
      component={StringField}
      fieldId="password"
      label="password"
      type="password"
    />
    <Button label="Submit" type="submit" />
  </FormWrapper>
)

export default Form({})(LoginForm);
