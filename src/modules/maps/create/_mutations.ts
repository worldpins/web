import gql from 'graphql-tag';

export const createMapMutation = gql`
  mutation createMap (
    $name: String!
    $comment: String
    $longitude: Float
    $latitude: Float
  ) {
    createMap(
      name: $name
      comment: $comment
      initialArea: {
        longitude: $longitude
        latitude: $latitude
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
