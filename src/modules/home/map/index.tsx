import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import mapQuery from './_queries.gql';
import { Query } from 'react-apollo';

const Map: React.FC<RouteComponentProps<{ mapId: string }>> = (
  { match: { params: { mapId } } },
) => {
  console.log(mapId);
  return (
    <Query query={mapQuery} variables={{ id: mapId }}>
      {(...args) => {
        console.log(args);
        return <p>hhi</p>;
      }}
    </Query>
  );
};

export default Map;
