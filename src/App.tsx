import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from './layout/styled';
import client from './ApolloClient';
import Spinner from './common/Spinner'; // TODO: convert to loading screen
import theme from './layout/theme';
import GlobalStyles from './global/GlobalStyles';
import TopBar from './layout/components/TopBar';

const Maps = React.lazy(() => import(/* webpackChunkName: "maps" */'./modules/maps'));
const Home = React.lazy(() => import(/* webpackChunkName: "home" */'./modules/home'));
const Auth = React.lazy(() => import(/* webpackChunkName: "auth" */'./modules/auth'));

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <React.Suspense fallback={<Spinner />}>
          <GlobalStyles />
          <TopBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/maps/:mapId?" exact={false} component={Maps} />
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
