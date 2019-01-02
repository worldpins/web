import * as React from 'react';
import { Query } from 'react-apollo';
import { Route } from 'react-router';

import Spinner from '../../common/Spinner';
import styled from '../../layout/styled';

import { mapsQuery } from './_queries';
import SideBar from './read/SideBar';
import CreateMapModal from './create/Map';
import WorldsPinsMap from './read/Map';

interface MapItem {
  id: string;
  name: string;
}

interface MapData {
  maps: {
    filteredCount: number;
    items: [MapItem]
    totalCount: number;
  }
}

interface MapVariables {
  from?: number;
  limit?: number;
}

interface MapsProps {
  history: { push: (path: string) => void; }
  match: {
    params: {
      mapId?: string;
    }
  };
};

const Wrapper = styled.div`
  display: flex;
`;

class MapsQuery extends Query<MapData, MapVariables> { };

const Maps: React.SFC<MapsProps> = ({ history, match }) => {
  const hasMapIdSelected = match.params.mapId && match.params.mapId !== 'create';
  return (
    <React.Fragment>
      <MapsQuery fetchPolicy="cache-and-network" query={mapsQuery}>
        {({ loading, data, error }) => {
          if (loading) return <Spinner />
          if (error) return <p>Error {error.message}</p>
          return data && (
            <Wrapper>
              <SideBar
                totalCount={data.maps.totalCount}
                filteredCount={data.maps.filteredCount}
                history={history}
                maps={data.maps.items}
                selectedId={match.params.mapId}
              />
              <WorldsPinsMap mapId={hasMapIdSelected ? match.params.mapId : undefined} />
            </Wrapper>
          );
        }}
      </MapsQuery>
      <Route path="/maps/create" component={CreateMapModal} />
    </React.Fragment>
  )
}

export default Maps;
