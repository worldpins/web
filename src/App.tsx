import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { ThemeProvider } from './layout/styled';
import Spinner from './common/Spinner'; // TODO: convert to loading screen
import theme from './layout/theme';

const Maps = React.lazy(() => import(/* webpackChunkName: "maps" */'./modules/maps'));
const Home = React.lazy(() => import(/* webpackChunkName: "home" */'./modules/home'));
const Auth = React.lazy(() => import(/* webpackChunkName: "auth" */'./modules/auth'));
const ApolloProvider = React.lazy(() =>
  import(/* webpackChunkName: "ApolloProvider" */'./ApolloProvider'));
const TopBar = React.lazy(() =>
  import(/*webpackChunkName: "topbar" */'./layout/components/TopBar'));
const GlobalStyles = React.lazy(() =>
  import(/* webpackChunkName: "globalStyles" */'./global/GlobalStyles'));

const App = () => {
  const [apolloClient, setClient] = React.useState();
  React.useEffect(
    () => {
      import('./ApolloClient').then((client) => {
        setClient(() => client.default);
      });
    },
    []);

  if (!apolloClient) {
    return <Spinner />;
  }

  return (
    <React.Suspense fallback={<Spinner />}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <React.Suspense fallback={<Spinner />}>
              <GlobalStyles />
              <TopBar />
              <Switch>
                <Route path="/home" component={Home} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/maps/:mapId?" exact={false} component={Maps} />
                <Redirect to="/home" />
              </Switch>
            </React.Suspense>
          </BrowserRouter>
        </ThemeProvider>
      </ApolloProvider>
    </React.Suspense>
  );
};

export default App;
