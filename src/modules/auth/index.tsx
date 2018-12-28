import * as React from 'react';
import { Mutation } from 'react-apollo';

import { meQuery } from './_queries';
import { loginMutation, registerMutation } from './_mutations';
import Login from './Login';
import Register from './Register';

interface LoginArguments {
  email: string;
  password: string;
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

class LoginMutation extends Mutation<LoginPayload, LoginArguments> { }
class RegisterMutation extends Mutation<RegisterPayload, FormValues> { }

const refetchQueries = () => [{ query: meQuery }];

export default () => (
  <React.Fragment>
    <LoginMutation mutation={loginMutation}>
      {(login) =>
        <Login onSubmit={async (values: { email: string, password: string }) => {
          await login({
            variables: values,
            refetchQueries,
            update: (proxy, { data }) => setToken((data as any).login.authToken),
          });
        }} />}
    </LoginMutation>
    <RegisterMutation mutation={registerMutation}>
      {(register) =>
        <Register onSubmit={
          async (values: FormValues) => {
            await register({
              variables: values,
              refetchQueries,
              update: (proxy, { data }) => setToken((data as any).register.authToken),
            })
          }} />}
    </RegisterMutation>
  </React.Fragment>
);
