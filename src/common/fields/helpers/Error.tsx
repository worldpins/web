import * as React from 'react';

import styled from '../../../layout/styled';

interface ErrorProps {
  children: React.ReactNode
  className?: string
}

const ErrorWrapper = styled.p`
  color: ${({ theme }) => theme.danger};
  font-size: 12px;
  margin: 0;
  transition: all .25s;
`;

const Error = ({ children, className }: ErrorProps) => <ErrorWrapper className={className}>{children}</ErrorWrapper>

export default Error;