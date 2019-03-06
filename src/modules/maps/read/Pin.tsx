import * as React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { useToggle } from 'react-angler';

import Button from '../../../common/button';
import UpdatePinModal from '../update/Pin';
import styled from '../../../layout/styled';

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

const DataEntry = styled.p`
  margin: 0 !important;
  margin-bottom: 4px !important;
`;

const Pin: React.FC<PinProps> = ({ comment, id, name, location, data }) => {
  const position: [number, number] = [location.latitude, location.longitude];
  const { value: isUpdating, setTrue, setFalse } = useToggle(false);

  return (
    <Marker position={position}>
      <Popup>
        <DataEntry>Name: {name}</DataEntry>
        {comment && <DataEntry>Comment: {comment}</DataEntry>}
        {data && Object.keys(data).map(property => (
          <DataEntry key={property}>{property}: {data[property]}</DataEntry>
        ))}
        <Button label="Edit" onClick={setTrue} />
      </Popup>
      <Tooltip>{name}</Tooltip>
      {isUpdating && <UpdatePinModal id={id} onClose={setFalse} />}
    </Marker>
  );
};

export default React.memo(Pin);
