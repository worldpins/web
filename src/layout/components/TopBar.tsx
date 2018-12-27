import * as React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

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

interface MeData {
  me: {
    id: string;
    email: string;
  }
}

class MeQuery extends Query<MeData, {}> {}

const TopBar = React.memo(() => (
  <MeQuery query={meQuery}>
    {(props) => {
      console.log(props);
      return (
        <div>
          TopBar
        </div>
      )
    }}
  </MeQuery>
));

export default TopBar;
