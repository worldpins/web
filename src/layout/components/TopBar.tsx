import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

const NameWrapper = styled.p`
  margin: 0;
`;

const TopBarWrapper = styled.div<{ notAuthenticated?: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => theme.greyAccent};
  display: flex;
  justify-content: ${({ notAuthenticated }) => notAuthenticated ? 'flex-end' : 'space-between'};
  padding: 10px 6px;
  width: 100%
`;

const UserContainer = styled.div`
  display: flex;
`;

interface MeData {
  me: {
    id: string;
    email: string;
    profile: {
      firstName: string;
      lastName: string;
    }
  }
}

class MeQuery extends Query<MeData, {}> { }

const TopBar = React.memo(() => (
  <MeQuery query={meQuery}>
    {({ data, error, loading }) => {
      if (loading) return <TopBarWrapper />
      if (error) {
        return (
          <TopBarWrapper notAuthenticated>
            <Button label="login / register" to="/auth" />
          </TopBarWrapper>
        )
      }

      return (
        <TopBarWrapper>
          <div>
            <Button label="Maps" to="/maps" />
          </div>
          <UserContainer>
            {data && <NameWrapper>Welcome {data.me.profile.firstName} {data.me.profile.lastName}</NameWrapper>}
          </UserContainer>
        </TopBarWrapper>
      )
    }}
  </MeQuery>
));

export default TopBar;
