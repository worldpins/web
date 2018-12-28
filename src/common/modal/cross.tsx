import * as React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`cursor: pointer;`

interface CrossProperties {
  onClick: () => void;
}

const Cross = React.memo(({ onClick }: CrossProperties) => (
  <SVG
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <path
      fill="#3c3c3b"
      d="M24 2.4L14.4 12l9.6 9.6-2.4 2.4-9.6-9.6L2.4 24 0 21.6 9.6 12 0 2.4 2.4 0 12 9.6 21.6 0z"
      opacity=".495"
    />
  </SVG>
));

export default Cross;
