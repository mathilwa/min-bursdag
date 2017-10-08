import React from 'react';

import Filopplaster from './Filopplaster.jsx';

class Hovedside extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <h1>MATTA BLIR <u>30</u>! </h1>
        <p>Ta bilder og del dem med festen</p>
        <Filopplaster/>
      </div>
    );
  }
};

export default Hovedside;
