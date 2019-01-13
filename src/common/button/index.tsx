import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styled from '../../layout/styled';

const FakeButton = styled.div<ButtonProps>`
  background-color: ${({ theme, onClick }) => onClick ? theme.primary : 'transparant'};
  border: ${({ theme, onClick }) => onClick ? `1px solid ${theme.greyAccent}` : 0};
  color: ${({ theme }) => theme.secondary};
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
`;

const StyledButton = FakeButton.withComponent('button');
const StyledLink = FakeButton.withComponent(
  ({ theme, children, ...props }) => (
    <NavLink {...props}>{children}</NavLink>
  ));

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  label: string;
  onClick?: (e: React.SyntheticEvent) => void;
  to?: string;
  type?: string;
}

const Button: React.SFC<ButtonProps> = React.memo(({
  className,
  disabled,
  label,
  onClick,
  to,
  type,
}) => {
  return (
    onClick || type ?
      <StyledButton disabled={disabled} className={className} onClick={onClick} type={type}>{label}</StyledButton> :
      <StyledLink disabled={disabled} className={className} to={to}>{label}</StyledLink>
  )
});

export default Button;
