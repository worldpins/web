import * as React from 'react';
import { Mutation } from 'react-apollo';

import { login as loginMutation, register as registerMutation } from './_mutations.gql';
import Login from './Login';
import Register from './Register';
import styled from '../../layout/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 32px;
`;

interface LoginArguments {
  email: string;
  password: string;
}

interface FormValues {
  email: string;
  confirmPassword: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginPayload {
  data: {
    login: {
      authToken: string;
    },
  };
}

interface RegisterPayload {
  data: {
    register: {
      authToken: string;
    },
  };
}

export default ({ history }: { history: any }) => (
  <Wrapper>
    <Mutation<LoginPayload, LoginArguments> mutation={loginMutation}>
      {login => <Login login={login} history={history} />}
    </Mutation>
    <Mutation<RegisterPayload, FormValues> mutation={registerMutation}>
      {register => <Register register={register} history={history} />}
    </Mutation>
  </Wrapper>
);
