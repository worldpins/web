import gql from 'graphql-tag';

export const updatePinMutation = gql`
  mutation createPin (
    $id: String!
    $mapId: String!
    $name: String
    $comment: String
    $data: JSON
    $latitude: Float
    $longitude: Float
    $templatePinId: String
  ) {
    map (id: $mapId) {
      createPin(input: {
        id: $id
        name: $name
        comment: $comment
        templatePinId: $templatePinId
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
