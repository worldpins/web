import * as React from 'react';
import { Query } from 'react-apollo';

import publicMapsQuery from './_queries.gql';
import Spinner from '../../../common/Spinner';

interface MapItem {
  id: string;
  name: string;
  published: boolean;
}

interface MapData {
  publicMaps: {
    filteredCount: number;
    items: [MapItem]
    totalCount: number;
  };
}

interface MapVariables {
  from?: number;
  limit?: number;
}

class PublicMapsQuery extends Query<MapData, MapVariables> { }

const PublicMaps = () => {
  return (
    <React.Fragment>
      <h2>Maps</h2>
      <p>Here you will see any published maps</p>
      <PublicMapsQuery query={publicMapsQuery}>
        {({ loading, data }) => {
          if (loading) return <Spinner />;
          console.log(data);
          return (
            <div>
            {data && data.publicMaps.items.map(({ id, name }) => (
              <p key={id}>{name}</p>
            ))}
            </div>
          );
        }}
      </PublicMapsQuery>
    </React.Fragment>
  );
};

export default React.memo(PublicMaps);
