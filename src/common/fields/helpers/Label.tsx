import * as React from 'react';

import styled from '../../../layout/styled';

interface LabelProps {
  children: React.ReactNode;
  className?: any;
}

const LabelWrapper = styled.p`
  color: ${({ theme }) => theme.grey};
  font-size: 12px;
  margin: 0;
  transition: all .25s;
`;

const Label: React.FC<LabelProps> = ({ children, className }) => (
  <LabelWrapper className={className}>{children}</LabelWrapper>
);

export default React.memo(Label);
