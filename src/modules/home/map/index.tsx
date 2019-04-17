import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import mapQuery from './_queries.gql';
import { Query } from 'react-apollo';
import { Map, TileLayer } from 'react-leaflet';
import PinMarker from '../../maps/read/Pin';
import Filters from './filters';

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
    filters: object;
    name: string;
    id: string;
    pins: Pin[];
  };
}

const filterPins = (filterKeys: string[], pins: object[], activeFilters: object, filters: object) => {
  if (filterKeys.length > 0) {
    return pins.filter(({ data }: { data: object }) => {
      return filterKeys.some((key: string) => {
        const { type } = filters[key];
        if (type==='choice') {
          const point = data[key].toLowerCase();
          return activeFilters[key].some((value: string) => point.includes(value));
        } else if (type==='numeric') {
          const point = Number(data[key]);
          return point < (activeFilters[key].max || Infinity) && point < (activeFilters[key].min || 0)
        }
      })
    });
  } else {
    return pins;
  }
}

const MapView: React.FC<RouteComponentProps<{ mapId: string }>> = (
  { match: { params: { mapId } } },
) => {
  const [activeFilters, setFilters] = React.useState({});
  const filterKeys = React.useMemo(() => Object.keys(activeFilters), [activeFilters]);
  return (
    <Query<Data, Variables> query={mapQuery} variables={{ id: mapId }}>
      {({ data, error, loading }) => {
        if (loading) return 'Loading...';
        if (error) return 'Error...';
        const { initialArea: { latitude, longitude }, pins, filters } = data!.publicMap;
        const filteredPins = filterPins(filterKeys, pins, activeFilters, filters);
        return (
          <div>
            <Filters filters={filters} setFilters={setFilters} activeFilters={activeFilters} />
            <Map
              animate
              center={{ lat: latitude, lng: longitude }}
              zoom={13}
            >
              <TileLayer
                attribution={attribution}
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredPins.map(
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
          </div>
        );
      }}
    </Query>
  );
};

export default MapView;
