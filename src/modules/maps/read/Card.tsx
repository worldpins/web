import * as React from 'react';

import styled from '../../../layout/styled';

const CardWrapper = styled.div<{ isSelected: boolean }>`
  background-color: ${({ theme }) => theme.bg};
  box-shadow: ${({ isSelected }) => isSelected ? '0px 0px 2px 2px rgba(0,0,0,0.5)' : '0'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding: 10px;
  width: 90%;
  transform: ${({ isSelected }) => isSelected ? 'scale(1.1)' : 'scale(1)'};
  transition: transform .25s;
  &:hover {
    transform: scale(1.1);
  }
`;

interface Map {
  id: string;
  name: string;
}

interface Props {
  map: Map;
  selectMap: (id: string) => void;
  isSelected: boolean;
}

const Card: React.FC<Props> = React.memo((
  { map, selectMap, isSelected },
) => {
  const onClick = React.useCallback(() => selectMap(map.id), [map.id]);
  return (
    <CardWrapper onClick={onClick} isSelected={isSelected}>
      <p>{map.name}</p>
    </CardWrapper>
  );
});

export default Card;
