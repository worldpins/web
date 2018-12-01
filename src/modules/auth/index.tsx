import * as React from 'react';
import { Mutation } from 'react-apollo';

import { loginMutation, registerMutation } from './mutations';
import Login from './Login';
import Register from './Register';

export default () => (
  <React.Fragment>
    <Mutation mutation={loginMutation}>
      {(login, result) => <Login onSubmit={async (values: object) => await login({ variables: values })} result={result} />}
    </Mutation>
      <Mutation mutation={registerMutation}>
      {(register, result) => <Register onSubmit={async (values: object) => await register({ variables: values })} result={result} />}
    </Mutation>
  </React.Fragment>
);
