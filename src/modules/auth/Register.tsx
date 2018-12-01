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
)


export default Form({})(RegisterForm);
