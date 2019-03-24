import * as React from 'react';
import { Query } from 'react-apollo';
import { Route } from 'react-router';

import Spinner from '../../common/Spinner';
import styled from '../../layout/styled';

import { mapsQuery } from './_queries';
import SideBar from './read/SideBar';
import WorldsPinsMap from './read/Map';

const CreateMapModal = React.lazy(() => import(/* webpackChunkName: "createMap" */'./create/Map'));
const UploadMapModal = React.lazy(() => import(/* webpackChunkName: "uploadMap" */'./upload'));

interface MapItem {
  id: string;
  name: string;
  published: boolean;
}

interface MapData {
  maps: {
    filteredCount: number;
    items: [MapItem]
    totalCount: number;
  };
}

interface MapVariables {
  from?: number;
  limit?: number;
}

interface MapsProps {
  history: {
    replace: (path: string) => void;
    push: (path: string) => void;
  };
  match: {
    params: {
      mapId?: string;
    },
  };
}

const Wrapper = styled.div`
  display: flex;
`;

class MapsQuery extends Query<MapData, MapVariables> { }

const Maps: React.SFC<MapsProps> = ({ history, match: { params: { mapId: selectedMap } } }) => {
  const hasMapIdSelected = Boolean(selectedMap) &&
    selectedMap !== 'create' && selectedMap !== 'upload';
  const selectMap = React.useCallback((id: string) => history.replace(`/maps/${id}`), []);
  return (
    <React.Fragment>
      <MapsQuery fetchPolicy="cache-and-network" query={mapsQuery}>
        {({ loading, data, error }) => {
          if (loading) return <Spinner />;
          if (error) return <p>Error {error.message}</p>;
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
      <React.Suspense fallback={<p>Loading...</p>}>
        <Route path="/maps/create" component={CreateMapModal} />
        <Route path="/maps/upload" component={UploadMapModal} />
      </React.Suspense>
    </React.Fragment>
  );
};

export default Maps;
