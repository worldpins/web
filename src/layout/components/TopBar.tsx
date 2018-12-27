import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import styled from '../../layout/styled';
import Button from '../../common/button';

const meQuery = gql`
  query me {
    me {
      id
      email
      profile {
        firstName
        lastName
        dateOfBirth
      }
      roles
    }
  }
`;

const TopBarWrapper = styled.div<{ notAuthenticated?: boolean }>`
  background-color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => theme.greyAccent};
  display: flex;
  justify-content: ${({ notAuthenticated }) => notAuthenticated ? 'flex-end' : 'space-between'};
  padding: 10px 0;
  width: 100%
`;

interface MeData {
  me: {
    id: string;
    email: string;
  }
}

class MeQuery extends Query<MeData, {}> {}

const TopBar = React.memo(() => (
  <MeQuery query={meQuery}>
    {({ error, data }) => {
      if (error) {
        return (
          <TopBarWrapper notAuthenticated>
            <Button label="login / register" to="/auth" />
          </TopBarWrapper>
        )
      }

      return (
        <TopBarWrapper>
          TODO: topbar! Data from user is inside
        </TopBarWrapper>
      )
    }}
  </MeQuery>
));

export default TopBar;
