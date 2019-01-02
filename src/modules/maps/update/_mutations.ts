import gql from 'graphql-tag';

export const updatePinMutation = gql`
  mutation updatePin(
    $id: String!
    $name: String
    $comment: String
    $data: JSON
    $latitude: Float
    $longitude: Float
  ) {
    pin (id: $id) {
      update(input: {
        name: $name
        comment: $comment
        data: $data
        location: {
          latitude: $latitude
          longitude: $longitude
        }
      }) {
        id
        name
        comment
        data
        location {
          latitude
          longitude
        }
      }
    }
  }
`;
