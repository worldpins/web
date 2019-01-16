import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  html {
    height: 100%;
  }
  body {
    /* No ugly browser default padding/margin */
    padding: 0;
    margin: 0;
    height: 100%;
    /* Smooth text hack by Daniël */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    font-smooth: always;
    font-family: roboto;
    -moz-osx-font-smoothing: grayscale;
    text-shadow: 0.0625rem 0.0625rem 0.0625rem rgba(0,0,0,.004);
    * { /* Give it some specificity by putting this in body */
      box-sizing: border-box;
      font-family: 'Titillium Web', sans-serif;
    }
  }

  .leaflet-container {
    height: 93vh;
    width: 90%;
    margin: 0 auto;
  }
`;