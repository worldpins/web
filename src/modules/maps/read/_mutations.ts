import gql from 'graphql-tag';

export const updateMapMutation = gql`
  mutation createTemplate(
    $id: String!
    $published: Boolean

  ) {
    map(id: $id) {
      id
      updateMap(input: { published: $published }) {
        id
        published
      }
    }
  }
`;
