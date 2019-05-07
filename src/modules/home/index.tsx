import * as React from 'react';

import Spinner from '../../common/Spinner';
import { Route } from 'react-router';
import styled from '../../layout/styled';

const PublicMaps = React.lazy(() => import('./maps'));
const PublicMap = React.lazy(() => import('./map'));

const Container = styled.div`
  padding: 24px 32px;
  padding-bottom: 0px;
`;

const Home = () => (
  <Container>
    <h1>Welcome to Worldpins!</h1>
    <React.Suspense fallback={<Spinner />}>
      <PublicMaps />
      <Route path="/home/:mapId" component={PublicMap} />
    </React.Suspense>
  </Container>
);

export default Home;
