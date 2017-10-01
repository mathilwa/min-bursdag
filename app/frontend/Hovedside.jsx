import React from 'react';

import Filopplaster from './Filopplaster.jsx';

class Hovedside extends React.Component {
  constructor(props) {
    super(props);
    this.leggTilBildePaState = this.leggTilBildePaState.bind(this);
  }

  leggTilBildePaState (bilde) {
    const alleBilder = this.state.alleBilder;
    alleBilder.unshift(bilde);
    this.setState({ alleBilder: alleBilder})
  }

  render () {
    return (
      <div>
        <h1>MATTA BLIR 30! </h1>
        <Filopplaster leggTilBildePaState={this.leggTilBildePaState}/>
      </div>
    );
  }
};

export default Hovedside;
