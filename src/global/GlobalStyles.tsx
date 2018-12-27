import * as React from 'react';
import { Normalize } from 'styled-normalize';
import ProjectStyles from './_ProjectStyles';

// TODO: normalize and set font...
const GlobalStyles = () => (
  <React.Fragment>
    <Normalize />
    <ProjectStyles />
  </React.Fragment>
);

export default GlobalStyles;
