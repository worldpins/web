import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { useToggle } from 'react-angler';
import { LeafletMouseEvent } from 'leaflet';
import { Query } from 'react-apollo';
import { Route } from 'react-router';

import { map as mapQuery } from '../_queries.gql';

import PinMarker from './Pin';

const ManageTemplatesModal = React.lazy(() => import(
  /* webpackChunkName: "templatePinsModal" */'../templatePins'));
const CreatePinModal = React.lazy(() => import(
  /* webpackChunkName: "createPinModal" */'../create/Pin'));

interface MapProps {
  lat?: number;
  lon?: number;
  mapId?: string;
  zoom?: number;
}

interface Location {
  latitude: number;
  longitude: number;
}

interface Pin {
  id: string;
  name: string;
  data: object;
  comment: string;
  location: Location;
  orderedFields: string[];
}

interface Field {
  name: string;
}

interface Template {
  comment: string;
  fields: Field[];
  name: string;
}

interface MapData {
  map: {
    id: string;
    name: string;
    initialArea: Location;
    pins: Pin[]
    templatePins: Template[]
  };
}

// const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
// const attribution = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const mapUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png';

const WorldPinsMap: React.FC<MapProps> = ({
  lat = 50.85045, lon = 4.34878, mapId, zoom = 13,
}) => {
  const { 0: coordinates, 1: setCoordinates } = React.useState({});
  const { value: isCreating, setTrue, setFalse } = useToggle(false);

  const handleClick = React.useCallback(
    (e: LeafletMouseEvent) => {
      setCoordinates(e.latlng);
      setTrue();
    },
    [setCoordinates]);

  const center = React.useMemo(() => ({ lat, lng: lon }), [lat, lon]);
  const variables = React.useMemo(() => ({ id: mapId }), [mapId]);

  return (
    <Query<MapData, { id?: string }>
      skip={!mapId || mapId === 'create' || mapId === 'upload'}
      query={mapQuery}
      variables={variables}
    >
      {({ loading, data }) => (
        <React.Fragment>
          <Map
            animate
            center={center}
            onClick={handleClick}
            zoom={zoom}
          >
            <TileLayer
              attribution={attribution}
              url={mapUrl}
              zIndex={999}
            />
            {!loading && data && data.map && data.map.pins &&
              data.map.pins.map(
                ({ comment, id, name, location, data: pinData, orderedFields }: Pin) =>
              location.latitude ? (
                <PinMarker
                  key={id}
                  data={pinData}
                  editable={false}
                  name={name}
                  id={id}
                  location={location}
                  comment={comment}
                  orderedFields={orderedFields}
                />
              ) : <React.Fragment key={id} />)
            }
            <React.Suspense fallback={<p>Loading...</p>}>
              {data && data.map &&
                <Route
                  path={`/maps/${mapId}/templates`}
                  render={() => (
                    <ManageTemplatesModal id={mapId} templatePins={data.map.templatePins} />
                  )}
                />}
              {isCreating && mapId &&
                <CreatePinModal
                  coordinates={coordinates}
                  mapId={mapId}
                  onClose={setFalse}
                  templatePins={(data as any).map.templatePins || []}
                />}
            </React.Suspense>
          </Map>
        </React.Fragment>
      )}
    </Query>
  );
};

export default React.memo(WorldPinsMap);
