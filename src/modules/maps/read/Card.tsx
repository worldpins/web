import * as React from 'react';
import { Mutation } from 'react-apollo';

import updateMapMutation from './_mutations.gql';
import styled from '../../../layout/styled';
import CheckBox from '../../../common/fields/checkField/CheckBox';

const CardWrapper = styled.div<{ isSelected: boolean }>`
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  box-shadow: ${({ isSelected }) => isSelected ? '0px 0px 2px 2px rgba(0,0,0,0.5)' : '0'};
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  padding: 16px 22px;
  width: 90%;
  transform: ${({ isSelected }) => isSelected ? 'scale(1.1)' : 'scale(1)'};
  transition: transform .25s;
  &:hover {
    transform: scale(1.1);
  }
  > p {
    margin: 0;
    margin-left: 6px;
  }
`;

interface Map {
  id: string;
  name: string;
  published: boolean;
}

interface Props {
  map: Map;
  selectMap: (id: string) => void;
  isSelected: boolean;
}

const refetchQueries = ['maps', 'publicMaps'];

const Card: React.FC<Props> = (
  { map, selectMap, isSelected },
) => {
  const onClick = React.useCallback(() => selectMap(map.id), [map.id]);
  const variables = React.useMemo(() => ({ id: map.id }), [map.id]);
  return (
    <Mutation<any, { id?: string; published?: boolean }> variables={variables} mutation={updateMapMutation} refetchQueries={refetchQueries}>
      {mutate => (
        <React.Fragment>
          <CardWrapper onClick={onClick} isSelected={isSelected}>
            <CheckBox checked={map.published} onChange={e => {
              e.stopPropagation();
              mutate({ variables: { published: !map.published } })
            }} />
            <p>{map.name}</p>
          </CardWrapper>
        </React.Fragment>
      )}
    </Mutation>
  );
};

export default React.memo(Card);
