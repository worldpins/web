import * as React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';

interface PinProps {
  comment: string;
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  }
}

const Pin: React.SFC<PinProps> = React.memo(({ comment, name, location }) => {
  const position: [number, number] = [location.latitude, location.longitude];
  console.log('rendering pin on', position);
  return (
    <Marker position={position}>
      <Popup>{name}</Popup>
      <Tooltip>{comment}</Tooltip>
    </Marker>
  )
});

export default Pin;
