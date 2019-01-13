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
      createTemplatePin(name: $name, comment: $comment, fields: $fields) {
        id
      }
    }
  }
`;
