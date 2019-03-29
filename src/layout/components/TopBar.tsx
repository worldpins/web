import * as React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

import styled from '../../layout/styled';
import Button from '../../common/button';
import meQuery from './_queries.gql';

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

const LinkWrapper = styled.div`
  display: flex;
  > a:first-child {
    margin-right: 12px;
  }
`;

const TopBarWrapper = styled.div<{ notAuthenticated?: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border: ${({ theme }) => theme.greyAccent};
  display: flex;
  justify-content: space-between;
  padding: 10px 6px;
  width: 100%;
  height: ${({ notAuthenticated }) => notAuthenticated ? '3vh' : 'auto'};
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
    listen: Function;
  };
}

const TopBar: React.FC<Props> = ({ history }) => {
  return (
    <MeQuery query={meQuery}>
      {({ data, error, loading, refetch }) => {

        if (loading) return <TopBarWrapper />;

        if (error) {
          return (
            <TopBarWrapper notAuthenticated>
              <LinkButton label="Home" to="/" />
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
            <LinkWrapper>
              <LinkButton label="Home" to="/" />
              <LinkButton label="Maps" to="/maps" />
              <Divider />
            </LinkWrapper>
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
};

export default withRouter(React.memo(TopBar));
