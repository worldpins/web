import * as React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { useToggle } from 'react-angler';

import Button from '../../../common/button';
import UpdatePinModal from '../update/Pin';
import styled from '../../../layout/styled';
import { ColivingMarker, CohousingMarker, CommuneMarker, HomeshareMarker, SharehouseMarker, StudentcoopMarker } from './LoadPins';

interface PinProps {
  comment: string;
  data?: object;
  editable?: boolean;
  id: string;
  name: string;
  orderedFields?: string[];
  location: {
    latitude: number;
    longitude: number;
  };
}

const DataEntry = styled.p`
  margin: 0 !important;
  margin-bottom: 4px !important;
`;

const ToggleText = styled.p`
  cursor: pointer;
  color: blue;
  text-align: center;
`;

const type = 'Type of collaborative community';

const Pin: React.FC<PinProps> = ({ comment, editable, id, name, location, orderedFields, data }) => {
  const position: [number, number] = [location.latitude, location.longitude];
  const { toggle, value: showMore } = useToggle(false);
  const { value: isUpdating, setTrue, setFalse } = useToggle(false);

  const icon = React.useMemo(() => {
    if (!data && !(data as any)[type]) return CohousingMarker;
    switch ((data as any)[type].toLowerCase()) {
      case 'co-living': return ColivingMarker
      case 'cohousing': return CohousingMarker
      case 'commune': return CommuneMarker
      case 'home share': return HomeshareMarker
      case 'share house': return SharehouseMarker
      case 'student coop': return StudentcoopMarker
      default: return CohousingMarker
    }
  }, [data && (data as any)[type]]);

  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <DataEntry>Name: {name}</DataEntry>
        {comment && <DataEntry>Comment: {comment}</DataEntry>}
        {orderedFields && data && (showMore ? orderedFields : orderedFields.slice(0, 3)).map(property => (
            <DataEntry key={property}>
              {property}: {data[property]}
            </DataEntry>
        ))}
        <ToggleText onClick={toggle}>{showMore ? 'Show less' : 'Show more'}</ToggleText>
        {editable && <Button label="Edit" onClick={setTrue} />}
      </Popup>
      <Tooltip>{name}</Tooltip>
      {isUpdating && <UpdatePinModal id={id} onClose={setFalse} />}
    </Marker>
  );
};

export default React.memo(Pin);
