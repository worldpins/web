import * as React from 'react';

import styled from '../../../layout/styled';

import MapCard from './Card';
import Button from '../../../common/button';

interface Map {
  id: string;
  name: string;
}

interface SideBarProps {
  filteredCount: number;
  maps: [Map];
  totalCount: number;
}

const SideBar: React.SFC<SideBarProps> = React.memo(({
  filteredCount,
  maps,
  totalCount,
}) => {
  return (
    <React.Fragment>
      {maps.map((map) => <MapCard key={map.id} map={map} />)}
      <Button to="/maps/create" label="Create" />
    </React.Fragment>
  )
});

export default SideBar;
