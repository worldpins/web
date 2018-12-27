import * as React from 'react';

import styled from '../../../layout/styled';

interface Map {
  id: string;
  name: string;
}

const Card: React.SFC<{ map: Map }> = React.memo(({ map }) => (
  <div>
    <p>{map.name}</p>
  </div>
));

export default Card;
