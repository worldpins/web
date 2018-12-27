import * as React from 'react';
import { Query } from 'react-apollo';
import { Route } from 'react-router';

import { mapsQuery } from './_queries';
import SideBar from './components/SideBar';
import CreateMapModal from './create';

interface Map {
  id: string;
  name: string;
}

interface MapData {
  maps: {
    filteredCount: number;
    items: [Map]
    totalCount: number;
  }
}

interface MapVariables {
  from?: number;
  limit?: number;
}

class MapsQuery extends Query<MapData, MapVariables> { };

const Maps = () => {
  return (
    <React.Fragment>
      <MapsQuery fetchPolicy="cache-and-network" query={mapsQuery}>
        {({ loading, data, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>Error {error.message}</p>
          return data && (
            <SideBar
              totalCount={data.maps.totalCount}
              filteredCount={data.maps.filteredCount}
              maps={data.maps.items}
            />
          );
        }}
      </MapsQuery>
      <Route path="/maps/create" component={CreateMapModal} />
    </React.Fragment>
  )
}

export default Maps;
