import * as React from 'react';

import Spinner from '../../common/Spinner';
import { Route } from 'react-router';

const PublicMaps = React.lazy(() => import('./maps'));

const Home = () => (
  <div>
    <h1>Welcome to Worldpins!</h1>
    <React.Suspense fallback={<Spinner />}>
      <PublicMaps />
      <Route path="/:mapId" component={PublicMap} />
    </React.Suspense>
  </div>
);

export default Home;
