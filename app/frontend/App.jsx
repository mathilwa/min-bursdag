import React from 'react';
import 'babel-polyfill';
import { polyfill } from 'es6-promise';
import { forIn } from 'lodash';

import QrReader from 'react-qr-reader';
import Filopplaster from './Filopplaster.jsx';
import Bilder from './Bilder.jsx';
polyfill();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hentBildeListe = this.hentBildeListe.bind(this);
    this.byggBildeliste = this.byggBildeliste.bind(this);
    this.state = {
      alleBilder: [],
    }
  }

  componentDidMount () {
    this.hentBildeListe();
  }

  hentBildeListe () {
    console.log('innher?')
    fetch('https://min-bursdag.firebaseio.com/bilder.json').then(response => {
      if (response.ok) {
        response.json().then(bilder => {
          this.byggBildeliste(bilder);
        });
      }
    }).catch(() => {
      console.log('Kunne ikke hente bilder');
    });
  }

  byggBildeliste (bilder) {
    const alleBilder = [];
    forIn(bilder, bilde => {
      alleBilder.push(bilde);
    });
    this.setState({alleBilder: alleBilder});
  }

  render () {
    return (
      <div>
        <h1>MATTA BLIR 30! </h1>
        <Filopplaster hentBildeListe={this.hentBildeListe}/>
        <Bilder bilder={this.state.alleBilder}/>
      </div>
    );
  }
};

export default App;
