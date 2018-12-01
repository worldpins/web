import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background: grey;
  padding: 20px 20px;
  > * {
    margin-right: 10px;
  }
`;

const StyledLink = styled(NavLink)`
  color: black;
  text-decoration: none;
  transition: transform 1s ease-in-out;
  transform: scale(1);
  &.active {
    color: blue;
    transform: scale(1.1);
  }
`;

const Header = React.memo(() => (
  <HeaderWrapper>
    <StyledLink exact={true} to="/">Home</StyledLink>
    <StyledLink to="/auth">Auth</StyledLink>
  </HeaderWrapper>
));

export default Header;
