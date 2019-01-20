import gql from 'graphql-tag';

export const createTemplatePinMutation = gql`
  mutation createTemplate(
    $id: String!
    $name: String!
    $comment: String
    $fields: JSON

  ) {
    map(id: $id) {
      id
      createTemplatePin(input: { name: $name, comment: $comment, fields: $fields }) {
        id
      }
    }
  }
`;

export const updateTemplatePinMutation = gql`
  mutation updateTemplatePin(
    $id: String!
    $mapId: String!
    $name: String!
    $comment: String
    $fields: JSON

  ) {
    map(id: $mapId) {
      id
      updateTemplatePin(input: { id:$ id, name: $name, comment: $comment, fields: $fields }) {
        id
      }
    }
  }
`;
