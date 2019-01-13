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

interface MapsProps { };

const Wrapper = styled.div`
  display: flex;
`;

class MapsQuery extends Query<MapData, MapVariables> { };

const Maps: React.SFC<MapsProps> = ({ history, match: { params: { mapId: selectedMap } } }) => {
  const hasMapIdSelected = Boolean(selectedMap) && selectedMap !== 'create';
  const selectMap = React.useCallback((id: string) => history.replace(`/maps/${id}`));
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
                selectMap={selectMap}
                maps={data.maps.items}
                selectedId={selectedMap}
              />
              <WorldsPinsMap mapId={hasMapIdSelected ? selectedMap : undefined} />
            </Wrapper>
          );
        }}
      </MapsQuery>
      <Route path="/maps/create" component={CreateMapModal} />
    </React.Fragment>
  )
}

export default Maps;
