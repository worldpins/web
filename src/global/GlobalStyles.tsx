import * as React from 'react';
import { Normalize } from 'styled-normalize';
import ProjectStyles from './_ProjectStyles';

const GlobalStyles = () => (
  <React.Fragment>
    <Normalize />
    <ProjectStyles />
  </React.Fragment>
);

export default GlobalStyles;
