import gql from 'graphql-tag';

export const pinQuery = gql`
  query pin ($id: String!) {
    pin (id: $id) {
      id
      name
      comment
      data
      location {
        latitude
        longitude
      }
      template {
        id
        name
        fields
        comment
      }
    }
  }
`;
