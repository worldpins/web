import gql from 'graphql-tag';

export const loginMutation = gql`
  mutation login($email: String!, $password: String!){
    login(input: { email: $email, password: $password }) {
      authToken
    }
  }
`;

export const registerMutation = gql`
  mutation register(
    $email: String!,
    $password: String!,
    $confirmPassword: String!,
    $firstName: String!,
    $lastName: String!
  ){
    login(input: {
      email: $email,
      password: $password,
      confirmPassword: $confirmPassword,
      profile: {
        firstName: $firstName,
        lastName: $lastName
      }
    }) {
      authToken
    }
  }
`;
