import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import mapQuery from './_queries.gql';
import { Query } from 'react-apollo';
import { Map, TileLayer } from 'react-leaflet';
import PinMarker from '../../maps/read/Pin';
import Filters from './filters';
import styled from '../../../layout/styled';

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

const Wrapper = styled.div`
  align-items: flex-start;
  display: flex;
  margin-left: -32px;
  margin-right: -32px;
  padding-left: 6px;
  padding-right: 6px;
`;

const MapWrapper = styled.div<{ isOpen: boolean }>`
  margin-left: 6px;
  width: ${({ isOpen }) => isOpen ? '80%' : '100%'};
`;

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

const filterPins = (
  filterKeys: string[], pins: object[], activeFilters: object, filters: object,
) => {
  if (filterKeys.length > 0) {
    return pins.filter(({ data, ...args }: { data: object }) => {
      return filterKeys.every((key: string) => {
        if (data[key] === undefined) return false;
        const { type } = filters[key];
        if (type === 'choice') {
          const p = data[key];
          return activeFilters[key].some((value: string) => p.includes(value));
        }
        let point = data[key];
        if (point.includes('to')) {
          const [min, max] = point.split('to');
          return Number(max) <= (Number(activeFilters[key].max) || Infinity) &&
            Number(min) >= (Number(activeFilters[key].min) || 0);
        }
        point = Number(point);
        return point <= (Number(activeFilters[key].max) || Infinity) &&
          point >= (Number(activeFilters[key].min) || 0);
      });
    });
  }
  return pins;
};

const MapView: React.FC<RouteComponentProps<{ mapId: string }>> = (
  { match: { params: { mapId } } },
) => {
  const [activeFilters, setFilters] = React.useState({});

  const filterKeys = React.useMemo(() => Object.keys(activeFilters), [activeFilters]);
  const variables = React.useMemo(() => ({ id: mapId }), [mapId]);

  return (
    <Query<Data, Variables> query={mapQuery} variables={variables}>
      {({ data, error, loading }) => {
        if (loading) return 'Loading...';
        if (error) return 'Error...';

        const { initialArea: { latitude, longitude }, pins, filters } = data!.publicMap;
        const filteredPins = filterPins(filterKeys, pins, activeFilters, filters);

        return (
          <Wrapper>
            <Filters filters={filters} setFilters={setFilters} activeFilters={activeFilters} />
            <MapWrapper isOpen>
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
            </MapWrapper>
          </Wrapper>
        );
      }}
    </Query>
  );
};

export default React.memo(MapView);
