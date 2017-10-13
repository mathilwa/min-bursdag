import React from 'react';
import { forIn, isEmpty, orderBy } from 'lodash';

import AlleBilder from './AlleBilder.jsx';

class AlleBilderSide extends React.Component {
  constructor(props) {
    super(props);
    this.hentBildeListe = this.hentBildeListe.bind(this);
    this.byggBildeliste = this.byggBildeliste.bind(this);
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
    fetch('https://min-bursdag.firebaseio.com/testmini69.json').then(response => {
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

  render() {
    const overskrift = 'Bildene fra festen ' + String.fromCodePoint(0x270C);
    return (
      <div className="alle-bilder">
        <h1>{overskrift}</h1>
        <AlleBilder alleBilder={this.state.alleBilder} henterBilder={this.state.henterBilder}/>
      </div>
    );
  }
};

export default AlleBilderSide;