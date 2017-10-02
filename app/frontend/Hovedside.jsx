import React from 'react';

import Filopplaster from './Filopplaster.jsx';

class Hovedside extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h1>MATTA BLIR 30! </h1>
        <Filopplaster/>
      </div>
    );
  }
};

export default Hovedside;
