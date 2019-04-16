import * as React from 'react';
import styled from '../../../layout/styled';

const checkAttrs = { type: 'checkbox' };
const HiddenCheckbox = styled.input.attrs(checkAttrs)<{ checked?: boolean }>`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const StyledCheckbox = styled.div<{ checked?: boolean }>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${({ checked }) => checked ? 'salmon' : 'papayawhip'};
  border-radius: 3px;
  transition: all 150ms;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }
  ${Icon} {
    visibility: ${({ checked }) => checked ? 'visible' : 'hidden'}
  }
`;

const CheckboxContainer = styled.div``;

interface Props {
  className?: string;
  checked?: boolean;
}

const Checkbox: React.FC<Props> = ({ className, checked, ...props }) => (
  <CheckboxContainer className={className}>
    <HiddenCheckbox checked={checked} {...props} />
    <StyledCheckbox checked={checked}>
    <Icon viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </Icon>
    </StyledCheckbox>
  </CheckboxContainer>
);

export default React.memo(Checkbox);
