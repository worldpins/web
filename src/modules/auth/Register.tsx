import * as React from 'react';
import { Field, Form } from 'hooked-form';

import StringField from '../../common/fields/stringField';

const RegisterForm = ({ handleSubmit }: { handleSubmit: () => void }) => (
  <form onSubmit={handleSubmit}>
    <h1>Register</h1>
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
    <button type="submit">Submit</button>
  </form>
);

interface FormValues {
  email: string;
  confirmPassword: string;
  password: string;
  firstName: string;
  lastName: string
}

interface FormErrors {
  email?: string;
  confirmPassword?: string;
  password?: string;
  firstName?: string;
  lastName?: string
}

export default Form({
  validateOnBlur: true,
  validateOnChange: true,
  validate: ({ email, password, confirmPassword, lastName, firstName }: FormValues) => {
    const errors : FormErrors = {};
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
})(RegisterForm);
