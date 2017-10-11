import React from 'react';

import Filopplaster from './Filopplaster.jsx';

class Hovedside extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className="l-content">
        <main>
          <h1>MATTA BLIR <u>30</u>! </h1>
          <Filopplaster/>
        </main>
      </div>
    );
  }
};

export default Hovedside;
