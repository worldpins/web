import * as React from 'react';
import { Query } from 'react-apollo';

import { mapsQuery } from './_queries';

interface Map {
  id: string;
}

interface MapData {
  maps: [Map]
}

interface MapVariables {
  from?: number;
  limit?: number;
}

class MapsQuery extends Query<MapData, MapVariables> { };

const Maps = () => {
  return (
    <MapsQuery fetchPolicy="cache-and-network" query={mapsQuery}>
      {({ loading, data, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) return <p>Error {error.message}</p>
        return data && data.maps.map(({ id }) => <p key={id}>{id}</p>)
      }}
    </MapsQuery>
  )
}

export default Maps;
