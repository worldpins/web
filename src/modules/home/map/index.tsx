import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import mapQuery from './_queries.gql';
import { Query } from 'react-apollo';
import { Map, TileLayer } from 'react-leaflet';
import PinMarker from '../../maps/read/Pin';

const attribution = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

interface Variables {
  id: string;
}

interface Pin {
  comment: string;
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  data: object;
  orderedFields: string[];
}

interface Data {
  publicMap: {
    initialArea: {
      latitude: number;
      longitude: number;
    }
    name: string;
    id: string;
    pins: Pin[];
  };
}

class MapQuery extends Query<Data, Variables> { }

const MapView: React.FC<RouteComponentProps<{ mapId: string }>> = (
  { match: { params: { mapId } } },
) => {
  return (
    <MapQuery query={mapQuery} variables={{ id: mapId }}>
      {({ data, loading }) => {
        if (loading) return 'Loading...';
        const { initialArea: { latitude, longitude }, pins } = data!.publicMap;
        return (
          <Map
            animate
            center={{ lat: latitude, lng: longitude }}
            zoom={13}
          >
            <TileLayer
              attribution={attribution}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {pins.map(
                ({ comment, id, name, location, data: pinData, orderedFields }: Pin) =>
              location.latitude ? (
                <PinMarker
                  key={id}
                  editable={false}
                  data={pinData}
                  name={name}
                  id={id}
                  location={location}
                  comment={comment}
                  orderedFields={orderedFields}
                />
              ) : <React.Fragment key={id} />)
            }
          </Map>
        );
      }}
    </MapQuery>
  );
};

export default MapView;
