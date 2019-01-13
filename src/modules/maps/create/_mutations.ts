import gql from 'graphql-tag';

export const createPinMutation = gql`
  mutation createPin (
    $id: String!
    $name: String!
    $comment: String
    $latitude: Float
    $longitude: Float
    $data: JSON
  ) {
    map (id: $id) {
      createPin(input: {
        name: $name
        comment: $comment
        coordinates: {
          longitude: $longitude
          latitude: $latitude
        }
        data: $data
      }) {
        id
        name
      }
    }
  }
`;

export const createMapMutation = gql`
  mutation createMap (
    $name: String!
    $comment: String
    $longitude: Float
    $latitude: Float
  ) {
    createMap(
      input: {
        name: $name
        comment: $comment
        initialArea: {
          longitude: $longitude
          latitude: $latitude
        }
      }
    ) {
      id
      name
      comment
      initialArea {
        longitude
        latitude
      }
    }
  }
`;
