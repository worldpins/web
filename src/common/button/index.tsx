import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styled from '../../layout/styled';

const FakeButton = styled.div`
  background-color: ${({ theme, onClick }) => onClick ? theme.primary : 'transparant'};
  border: ${({ theme, onClick }) => onClick ? `1px solid ${theme.greyAccent}` : 0};
  color: ${({ theme }) => theme.secondary};
`;

const StyledButton = FakeButton.withComponent('button');
const StyledLink = FakeButton.withComponent(
  ({ theme, children, ...props }) => (
  <NavLink {...props}>{children}</NavLink>
));

export interface ButtonProps {
  className?: string;
  label: string;
  onClick?: (e: React.SyntheticEvent) => void;
  to?: string;
  type?: string;
}

const Button: React.SFC<ButtonProps> = React.memo(({
  className,
  label,
  onClick,
  to,
  type,
}) => {
  return (
    onClick || type ?
      <StyledButton className={className} onClick={onClick} type={type}>{label}</StyledButton> :
      <StyledLink className={className} to={to}>{label}</StyledLink>
  )
});

export default Button;
