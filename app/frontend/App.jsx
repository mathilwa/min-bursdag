import React from 'react';
import 'babel-polyfill';
import { polyfill } from 'es6-promise';

import QrReader from 'react-qr-reader';
import Kamera from './Kamera.jsx';
import Filopplaster from './Filopplaster.jsx';
polyfill();

const App = () => {
  return (
    <div>
      <h1>Matta blir 30! </h1>
      <Filopplaster>
      </Filopplaster>
      <div>

      </div>
    </div>
  );
};

export default App;
