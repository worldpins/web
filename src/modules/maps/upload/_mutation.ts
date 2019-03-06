import gql from 'graphql-tag';

export const uploadMapMutation = gql`
  mutation uploadMap(
    $map: JSON!

  ) {
    uploadMap(map: $map) {
      id
    }
  }
`;
