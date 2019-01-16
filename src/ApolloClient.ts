import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

// Can be used to add a token to the request headers.
const request = (operation: { setContext: (options: object) => void }) => {
  const token = window.localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: `bearer ${token}`,
    },
  });
};

// The default requestLink.
const requestLink = new ApolloLink((operation: any, forward: (operation: (any)) => any) => {
  return new Observable((observer: any) => {
    let handle: any;
    // The reason for using Promise.resolve here is because the typing for using
    // async observer are invalid.
    Promise.resolve(operation)
      .then((oper: any) => request(oper))
      .then(() => {
        // This handle is what your Query uses to observe handled values.
        // Complete --> completed request,
        // next is a request for data an
        // error implies an errored request.
        handle = forward(operation).subscribe({
          complete: observer.complete.bind(observer),
          error: observer.error.bind(observer),
          next: observer.next.bind(observer),
        });
      }).catch(e => observer.error.bind(observer));
    return () => {
      if (handle) handle.unsubscribe();
    };
  });
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }: { graphQLErrors?: any, networkError?: any }) => {
      if (graphQLErrors) {
        graphQLErrors.map((
          { message, locations, path }: { message: any, locations: any, path: any },
        ) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    requestLink,
    new HttpLink({
      credentials: 'same-origin',
      uri: 'http://localhost:3000/graphql',
    }),
  ]),
});

export default client;
