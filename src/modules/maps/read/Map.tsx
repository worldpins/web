import * as React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import { useToggle } from 'react-angler';
import { LeafletMouseEvent } from 'leaflet';
import { Query } from 'react-apollo';
import { Route } from 'react-router';

import { mapQuery } from '../_queries';

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

class MapQuery extends Query<MapData, { id?: string }> { }
const attribution = '&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';

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

  return (
    <MapQuery
      skip={!mapId || mapId === 'create' || mapId === 'upload'}
      query={mapQuery}
      variables={{ id: mapId }}
    >
      {({ loading, data }) => (
        <React.Fragment>
          <Map
            animate
            center={{ lat, lng: lon }}
            onClick={handleClick}
            zoom={zoom}
          >
            <TileLayer
              attribution={attribution}
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {!loading && data && (data as any).map && (data as any).map.pins &&
              (data as any).map.pins.map(
                ({ comment, id, name, location, data: pinData, orderedFields }: Pin) =>
              location.latitude ? (
                <PinMarker
                  key={id}
                  data={pinData}
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
    </MapQuery>
  );
};

export default React.memo(WorldPinsMap);
