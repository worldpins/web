import * as React from 'react';
import { Query } from 'react-apollo';

import { mapsQuery } from './_queries';

class MapsQuery extends Query<> {};

const Maps = () => {
  return (
    <MapsQuery fetchPolicy="cache-and-network" query={mapsQuery}>
      {(data) => console.log(data) || <p>hi</p>}
    </MapsQuery>
  )
}

export default Maps;
