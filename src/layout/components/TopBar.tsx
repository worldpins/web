import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import styled from '../../layout/styled';
import Button from '../../common/button';
import { withRouter } from 'react-router';

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
  color: white;
  margin: 0;
`;

const Divider = styled.div`
  border: 1px solid white;
  margin-left: 12px;
  margin-right: 12px;
  margin-top: -10px;
  margin-bottom: -10px;
  padding-bottom: 10px;
  padding-top: 10px;
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
  };
}

class MeQuery extends Query<MeData, {}> { }

const LogoutButton = styled(Button)`
  border: 0;
  height: 100%
`;

const LinkButton = styled(Button)`
  color: white;
`;

interface Props {
  history: {
    push: (path: string) => void;
    listen: Function
  };
}

const TopBar: React.FC<Props> = React.memo(({ history }) => {
  return (
    <MeQuery query={meQuery}>
      {({ data, error, loading, refetch }) => {
        history.listen((match: any, operation: string) => {
          if (operation === 'PUSH') {
            refetch();
          }
        });
        if (loading) return <TopBarWrapper />;
        if (error) {
          return (
            <TopBarWrapper notAuthenticated>
              <LinkButton label="login / register" to="/auth" />
            </TopBarWrapper>
          );
        }
        const logout = () => {
          window.localStorage.removeItem('token');
          refetch();
          history.push('/');
        };
        return (
          <TopBarWrapper>
            <div>
              <LinkButton label="Maps" to="/maps" />
            </div>
            <UserContainer>
              {data && (
                <React.Fragment>
                  <NameWrapper>
                    Welcome {data.me.profile.firstName} {data.me.profile.lastName}
                  </NameWrapper>
                  <Divider />
                  <LogoutButton label="logout" onClick={logout} />
                </React.Fragment>
              )}
            </UserContainer>
          </TopBarWrapper>
        );
      }}
    </MeQuery>
  );
});

export default withRouter(TopBar);
