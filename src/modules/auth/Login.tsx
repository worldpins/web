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

const setToken = (token: string) => { window.localStorage.setItem('token', token); };

interface Props {
  formError: string;
  handleSubmit: () => void;
  history: {
    push: (path: string) => void,
  };
  login: (values: object) => Promise<void>;
}

const LoginForm = ({ formError, handleSubmit }: Props) => (
  <FormWrapper onSubmit={handleSubmit}>
    <h1>Login</h1>
    {formError && <p>{formError}</p>}
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
);

export default Form({
  onError: (err: any, setFormError: (err: string) => void) => setFormError(err.message),
  onSubmit: async (values: { email: string, password: string }, { login, history }: Props) => {
    await login({
      refetchQueries: ['me'],
      update: (proxy: any, { data }: any) => setToken(data.login.authToken),
      variables: values,
    });
    setTimeout(() => history.push('/maps'), 300);
  },
})(React.memo(LoginForm));
