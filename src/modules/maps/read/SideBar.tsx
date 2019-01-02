import * as React from 'react';

import styled from '../../../layout/styled';

import MapCard from './Card';
import Button from '../../../common/button';

const SideBarWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 5px;
  width: 10%;
`;

interface Map {
  id: string;
  name: string;
}

interface SideBarProps {
  filteredCount: number;
  history: {
    push: (path: string) => void;
  };
  maps: [Map];
  selectedId?: string;
  totalCount: number;
}

const SideBar: React.SFC<SideBarProps> = React.memo(({
  filteredCount,
  history,
  maps,
  totalCount,
  selectedId,
}) => {
  return (
    <SideBarWrapper>
      {maps.map((map) => (
        <MapCard key={map.id} map={map} push={history.push} isSelected={selectedId === map.id} />
      ))}
      <Button to="/maps/create" label="Create" />
    </SideBarWrapper>
  )
});

export default SideBar;
