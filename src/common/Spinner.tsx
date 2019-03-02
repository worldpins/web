import * as React from 'react';

import styled, { keyframes } from '../layout/styled';

const pulsate = keyframes`
  0% {
    transform: scale(.1);
    opacity: 0.0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Signal = styled.div<{ color?: string, size: number }>`
  border-radius: 100%;
  margin-top: auto;
  margin-bottom: auto;
  opacity: 0;
  padding: 0;
  position: relative;
  width: ${props => props.size}em;
  height: ${props => props.size}em;
  animation: ${pulsate} 1s ease-out;
  animation-iteration-count: infinite;
  border: 3px solid ${props => props.color || props.theme.primary};
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.5rem;
`;

// Public interface
// ////////////////

export const SpinnerBox = styled.div`
  margin: auto;
  height: 3em;
  width: 7em;
  text-align: center;
`;

export const SpinnerContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  align-items: center;
  z-index: 4;
`;

const Spinner = ({ color, size = 1.417 }: { color?: string, size?: number }) => (
  <Signal color={color} size={size} />
);

export default Spinner;
