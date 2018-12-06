import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }: { graphQLErrors: any, networkError: any }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }: { message: any, locations: any, path: any}) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    new HttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

export default client;
