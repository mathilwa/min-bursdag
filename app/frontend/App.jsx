import React from 'react';
import 'babel-polyfill';
import { polyfill } from 'es6-promise';

import QrReader from 'react-qr-reader';
import Kamera from './Kamera.jsx';
import Bla from './Bla.jsx';
polyfill();

const App = () => {
  return (
    <div>
      <h1>Matta blir 30! </h1>
      <Bla>
      </Bla>
      <div>

      </div>
    </div>
  );
};

export default App;
