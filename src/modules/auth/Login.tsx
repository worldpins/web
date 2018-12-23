import * as React from 'react';
import { Field, Form } from 'hooked-form';

import StringField from '../../common/fields/stringField';

const LoginForm = ({ handleSubmit }: { handleSubmit: () => void }) => (
  <form onSubmit={handleSubmit}>
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
    <button type="submit">Submit</button>
  </form>
)


export default Form({})(LoginForm);
