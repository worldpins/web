const beforeWares = [];
const afterWares = [];

interface FetchOptions {
  body: string,
  uri?: string;
}

function doGraphQLRequest({
  body,
  uri = '/graphql'
}: FetchOptions) {
  return fetch(uri, {
    body,
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
    },
  }).then(response => response.text().then(result => JSON.parse(result)))
}

export default doGraphQLRequest;
