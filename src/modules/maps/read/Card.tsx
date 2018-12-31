import * as React from 'react';

import styled from '../../../layout/styled';

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.grey};
  box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.5);
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding: 10px;
  width: 100%;
`;

interface Map {
  id: string;
  name: string;
}

const Card: React.SFC<{ map: Map; push: (path: string) => void; }> = React.memo(({ map, push }) => {
  const onClick = React.useCallback(() => push(`/maps/${map.id}`), [map.id]);
  return (
    <CardWrapper onClick={onClick}>
      <p>{map.name}</p>
    </CardWrapper>
  )
});

export default Card;
