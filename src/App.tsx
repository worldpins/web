import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import client from './ApolloClient';
import Auth from './modules/auth';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <p>Home</p>} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
