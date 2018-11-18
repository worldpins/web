import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Normalize } from 'styled-normalize';

// Layout
import Auth from './pages/authentication';
import Footer from './pages/footer';
import Header from './pages/header';
import Home from './pages/home';
import NotFound from './pages/notFound';

const App = React.memo(() => (
  <Router>
    <React.Fragment>
      <Normalize />
      <Header />
      <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/auth" component={Auth}/>
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </React.Fragment>
  </Router>
));

export default hot(module)(App);
