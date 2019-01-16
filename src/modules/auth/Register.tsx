import * as React from 'react';
import { Field, Form } from 'hooked-form';

import StringField from '../../common/fields/stringField';
import styled from '../../layout/styled';
import Button from '../../common/button';

const Divider = styled.div`
  border-left: 1px solid ${theme => theme.greyAccent};
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  padding: 6px 12px;
  margin-right: 24px;
  margin-left: 24px;
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
  register: (values: object) => Promise<void>;
}

const RegisterForm = React.memo(({ formError, handleSubmit }: Props) => (
  <React.Fragment>
    <Divider />
    <FormWrapper onSubmit={handleSubmit}>
      <h1>Register</h1>
      {formError && <p>{formError}</p>}
      <Field
        component={StringField}
        fieldId="email"
        label="Email"
      />
      <Field
        component={StringField}
        fieldId="password"
        label="Password"
        type="password"
      />
      <Field
        component={StringField}
        fieldId="confirmPassword"
        label="Confirm password"
        type="password"
      />
      <Field
        component={StringField}
        fieldId="firstName"
        label="First name"
      />
      <Field
        component={StringField}
        fieldId="lastName"
        label="Last name"
      />
      <Button label="Submit" type="submit" />
    </FormWrapper>
  </React.Fragment>
));

interface FormValues {
  email: string;
  confirmPassword: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface FormErrors {
  email?: string;
  confirmPassword?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export default Form({
  onError: (err: any, setFormError: (str: string) => void) => setFormError(err.message),
  onSubmit: async (values: object, { register, history }: Props) => {
    await register({
      update: (proxy: any, { data }: any) => setToken(data.register.authToken),
      variables: values,
    });
    setTimeout(() => history.push('/maps'), 300);
  },
  validate: ({ email, password, confirmPassword, lastName, firstName }: FormValues) => {
    const errors: FormErrors = {};
    if (!email) {
      errors.email = 'You need an email to register.';
    }
    if (!password) {
      errors.password = 'You need a password to register.';
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = 'Your passwords need to match.';
    }
    if (!lastName) {
      errors.lastName = 'You need a last name to register.';
    }
    if (!firstName) {
      errors.firstName = 'You need a first name to register.';
    }
    return errors;
  },
  validateOnBlur: true,
  validateOnChange: false,
})(RegisterForm);
