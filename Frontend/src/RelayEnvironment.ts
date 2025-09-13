import { Environment, Network, RecordSource, Store } from 'relay-runtime';

// Define the GraphQL endpoint
const GRAPHQL_ENDPOINT = process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:5000/graphql';

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
async function fetchRelay(operation: any, variables: any) {
  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    console.error('GraphQL errors:', data.errors);
    throw new Error('GraphQL errors occurred');
  }

  return data;
}

// Create a network layer from the fetch function
const network = Network.create(fetchRelay);

// Create the Relay Environment
const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default environment;

