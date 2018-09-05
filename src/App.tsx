import * as React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { TextField } from 'worldpins-react-framework';

const App = () => (
  <div>
    Hello WORLD!
    <TextField label="Name" onChange={console.log} value="REKT" />
  </div>
);

export default hot(module)(App);
