import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import client from './ApolloClient';
import Auth from './modules/auth';
import Home from './modules/home';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" component={Auth} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
