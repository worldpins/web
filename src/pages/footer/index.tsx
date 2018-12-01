import * as React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  background: grey;
  display: flex;
  justify-content: center;
  padding: 20px 20px;
`;

const Footer = React.memo(() => (
  <FooterWrapper>
    FOOTER
  </FooterWrapper>
));

export default Footer;
