import React from 'react';
import { forIn, isEmpty } from 'lodash';

import Loader from './Loader.jsx';

const Bilder = ({bilder, henterBilder}) => {
  if (henterBilder) {
    return <Loader/>;
  }

  const listUtBilder = () => {
    return bilder.map((bilde, index) => <li key={index}><img className="bilde" alt="your image" src={bilde.data}/></li>)
  };

  return (
    <ul className="alle-bilder">
      {listUtBilder()}
    </ul>
  );
};

export default Bilder;