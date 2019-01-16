import * as React from 'react';
import { NavLink } from 'react-router-dom';

import styled from '../../layout/styled';

const FakeButton = styled.div<{ to?: string; disabled?: boolean; flavor: Flavor; type?: string; }>`
  background-color: ${({ theme, to, flavor }) => to ? 'transparant' : theme[flavor]};
  border: ${({ theme, onClick, type }) => onClick || type ? `1px solid ${theme.greyAccent}` : 0};
  color: ${({ theme, to }) => to ? theme.secondary : '#FFFFFF'};
  cursor: ${({ disabled }) => disabled ? 'default' : 'pointer'};
`;

const StyledButton = FakeButton.withComponent('button');
const StyledLink = FakeButton.withComponent(
  ({ theme, children, ...props }) => (
    <NavLink {...props}>{children}</NavLink>
  ));

type Flavor = 'primary' | 'secondary' | 'danger';

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  flavor?: Flavor;
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
  flavor,
  type,
}) => {
  return (
    onClick || type ? (
      <StyledButton
        flavor={flavor || 'primary'}
        disabled={disabled}
        className={className}
        onClick={onClick}
        type={type}
      >{label}
      </StyledButton>
    ) :
      <StyledLink disabled={disabled} className={className} to={to}>{label}</StyledLink>
  );
});

export default Button;
