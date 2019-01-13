import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import client from './ApolloClient';
import Home from './modules/home';
import Spinner from './common/Spinner';
import { ThemeProvider } from './layout/styled';
import theme from './layout/theme';
import GlobalStyles from './global/GlobalStyles';
import TopBar from './layout/components/TopBar';

const Maps = React.lazy(() => import(/* webpackChunkName: "maps" */'./modules/maps'));
const Auth = React.lazy(() => import(/* webpackChunkName: "auth" */'./modules/auth'));

const App = () => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
