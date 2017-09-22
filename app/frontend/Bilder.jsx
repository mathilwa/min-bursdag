import React from 'react';
import { forIn, isEmpty } from 'lodash';

const Bilder = ({bilder}) => {
  const listUtBilder = () => {
    return bilder.map((bilde, index) => <li key={index}><img className="bilde" alt="your image" src={bilde.data}/></li>)
  };

  return (
      <div>
        <h2>ALLE BILDER</h2>
        <ul className="alle-bilder">
          {listUtBilder()}
        </ul>
      </div>
  );
}

export default Bilder;