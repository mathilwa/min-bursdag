import React from 'react';
import 'babel-polyfill';
import { polyfill } from 'es6-promise';
import { forIn, isEmpty, orderBy } from 'lodash';

import Filopplaster from './Filopplaster.jsx';
import Bilder from './Bilder.jsx';
polyfill();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.hentBildeListe = this.hentBildeListe.bind(this);
    this.byggBildeliste = this.byggBildeliste.bind(this);
    this.leggTilBildePaState = this.leggTilBildePaState.bind(this);
    this.state = {
      alleBilder: [],
      henterBilder: false,
    }
  }

  componentDidMount () {
    this.hentBildeListe();
  }

  hentBildeListe () {
    this.setState({ henterBilder: true});
    fetch('https://min-bursdag.firebaseio.com/bilder.json').then(response => {
      if (response.ok) {
        response.json().then(bilder => {
          this.byggBildeliste(bilder);
          this.setState({ henterBilder: false});
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
    const sortertListe = orderBy(alleBilder, 'datoLagret', 'asc');
    this.setState({alleBilder: sortertListe});
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
        <Bilder bilder={this.state.alleBilder} henterBilder={this.state.henterBilder}/>
      </div>
    );
  }
};

export default App;
