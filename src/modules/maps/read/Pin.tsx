import * as React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { useToggle } from 'react-angler';

import Button from '../../../common/button';
import UpdatePinModal from '../update/Pin';

interface PinProps {
  comment: string;
  data?: object;
  id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const Pin: React.FC<PinProps> = React.memo(({ comment, id, name, location, data = {} }) => {
  const position: [number, number] = [location.latitude, location.longitude];
  const { value: isUpdating, setTrue, setFalse } = useToggle(false);
  return (
    <Marker position={position}>
      <Popup>
        <p>Name: {name}</p>
        {Object.keys(data).map(property => (
          <p key={property}>{property}: {data[property]}</p>
        ))}
        <Button label="Edit" onClick={setTrue} />
      </Popup>
      <Tooltip>{comment}</Tooltip>
      {isUpdating && <UpdatePinModal id={id} onClose={setFalse} />}
    </Marker>
  );
});

export default Pin;
