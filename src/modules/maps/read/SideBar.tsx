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
  > a {
    margin-bottom: 12px;
  }
`;

interface Map {
  id: string;
  name: string;
}

interface SideBarProps {
  filteredCount: number;
  selectMap: (id: string) => void;
  maps: [Map];
  selectedId?: string;
  totalCount: number;
}

const SideBar: React.FC<SideBarProps> = ({
  selectMap,
  maps,
  selectedId,
}) => {
  return (
    <SideBarWrapper>
      {maps.map(map => (
        <MapCard key={map.id} map={map} selectMap={selectMap} isSelected={selectedId === map.id} />
      ))}
      <Button to="/maps/create" label="Create Map" />
      {selectedId && <Button to={`/maps/${selectedId}/templates`} label="Manage template pins" />}
      <Button to="/maps/upload" label="Upload Map" />
    </SideBarWrapper>
  );
};

export default React.memo(SideBar);
