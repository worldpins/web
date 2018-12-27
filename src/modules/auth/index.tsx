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

export default () => (
  <React.Fragment>
    <LoginMutation
      mutation={loginMutation}
      refetchQueries={() => [{ query: meQuery }]}
    >
      {(login, result) =>
        <Login onSubmit={async (values: { email: string, password: string }) => {
          const result = await login({ variables: values });
          console.log(result);
          setToken((result as any).data.login.authToken);
        }} result={result} />}
    </LoginMutation>
    <RegisterMutation
      mutation={registerMutation}
      refetchQueries={() => [{ query: meQuery }]}
    >
      {(register, result) =>
        <Register onSubmit={async (values: FormValues) => {
          const result = await register({ variables: values });
          console.log(result);
          setToken((result as any).data.register.authToken);
        }} result={result} onSuccess={setToken} />}
    </RegisterMutation>
  </React.Fragment>
);
