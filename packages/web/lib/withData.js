import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import withApollo from 'next-with-apollo';
import { endpoint } from './config';

function createClient({ headers }) {
  return new ApolloClient({
    link: createHttpLink({
      uri: endpoint,
      credentials: 'include',
      headers,
    }),
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
}

export default withApollo(createClient);
