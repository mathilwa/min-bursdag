import React from 'react';
import { forIn, isEmpty, orderBy } from 'lodash';

import Loader from './Loader.jsx';

class AlleBilder extends React.Component {
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

  render() {
    if(this.state.henterBilder) {
      return <Loader/>;
    }

    const listUtBilder = () => {
      return this.state.alleBilder.map((bilde, index) => <div key={index}><img className="" alt="your image" src={bilde.data}/></div>)
    };

    const overskrift = 'Alle bildene ' + String.fromCodePoint(0x270C)
    return (
      <div className="alle-bilder">
        <h1>{overskrift}</h1>
        <header>
          {listUtBilder()}
        </header>
      </div>
    );
  }
};

export default AlleBilder;