import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import client from './ApolloClient';
import Auth from './modules/auth';
import Home from './modules/home';

const Maps = React.lazy(() => import('./modules/maps'));

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <React.Suspense fallback={<p>Loading</p>}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" component={Auth} />
          <Route path="/maps" component={Maps} />
        </Switch>
      </React.Suspense>

    </BrowserRouter>
  </ApolloProvider>
);

export default App;
