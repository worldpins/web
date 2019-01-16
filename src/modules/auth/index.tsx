import * as React from 'react';
import { Mutation } from 'react-apollo';

import { loginMutation, registerMutation } from './_mutations';
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

class LoginMutation extends Mutation<LoginPayload, LoginArguments> { }
class RegisterMutation extends Mutation<RegisterPayload, FormValues> { }

export default ({ history }: { history: any }) => (
  <Wrapper>
    <LoginMutation mutation={loginMutation}>
      {login => <Login login={login} history={history} />}
    </LoginMutation>
    <RegisterMutation mutation={registerMutation}>
      {register => <Register register={register} history={history} />}
    </RegisterMutation>
  </Wrapper>
);
