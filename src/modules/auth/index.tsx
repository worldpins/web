import * as React from 'react';
import { Mutation } from 'react-apollo';

import { loginMutation, registerMutation } from './_mutations';
import Login from './Login';
import Register from './Register';

interface LoginArguments {
  variables: {
    email: string;
    password: string;
  }
}

interface AuthResult {
  authToken: string;
}

interface RegisterArguments {
  variables: {
    email: string;
    confirmPassword: string;
    password: string;
    firstName: string;
    lastName: string
  }
}

interface FormValues {
  email: string;
  confirmPassword: string;
  password: string;
  firstName: string;
  lastName: string
}

const setToken = (token: string) => {
  window.localStorage.setItem('token', token);
}

interface LoginPayload {
  data: {
    login: {
      authToken: string;
    }
  }
}

interface RegisterPayload {
  data: {
    register: {
      authToken: string;
    }
  }
}

export default () => (
  <React.Fragment>
    <Mutation mutation={loginMutation}>
      {(login: (input: LoginArguments) => LoginPayload, result: AuthResult) =>
        <Login onSubmit={async (values: { email: string, password: string }) => {
          const { data: { login: { authToken } } } = await login({ variables: values });
          setToken(authToken);
        }} result={result} />}
    </Mutation>
    <Mutation mutation={registerMutation}>
      {(register: (input: RegisterArguments) => RegisterPayload, result: AuthResult) =>
        <Register onSubmit={async (values: FormValues) => {
          const { data: { register: { authToken } } } = await register({ variables: values });
          setToken(authToken);
        }} result={result} onSuccess={setToken} />}
    </Mutation>
  </React.Fragment>
);
