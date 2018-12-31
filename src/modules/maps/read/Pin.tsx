import * as React from 'react';
import { Marker, Popup } from 'react-leaflet';

interface PinProps {
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  }
}

const Pin: React.SFC<PinProps> = React.memo(({ name, location }) => {
  const position: [number, number] = [location.latitude, location.longitude];
  console.log('rendering pin on', position);
  return (
    <Marker position={position}>
      <Popup>{name}</Popup>
    </Marker>
  )
});

export default Pin;
