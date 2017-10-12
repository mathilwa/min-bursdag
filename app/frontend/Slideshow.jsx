import React from 'react';
import { forIn, isEmpty, orderBy, some } from 'lodash';

import Loader from './Loader.jsx';

class Slideshow extends React.Component {
  constructor(props) {
    super(props);
    this.startIntervall = this.startIntervall.bind(this);
    this.settBildeindeksForVisning = this.settBildeindeksForVisning.bind(this);
    this.valgtBildeForVisningErSisteBildeILista = this.valgtBildeForVisningErSisteBildeILista.bind(this);
    this.hentBildeListe = this.hentBildeListe.bind(this);
    this.byggBildeliste = this.byggBildeliste.bind(this);
    this.state = {
      alleBilder: [],
      henterBilder: false,
      valgtBildeindeksForVisning: null,
    }
  }

  componentDidMount () {
    document.getElementsByTagName('body')[0].style.backgroundColor = 'black';
    this.startBildehenting();
  }

  startBildehenting () {
    this.hentBildeListeForsteGang();
    setInterval(() => this.hentBildeListe(), 10000)
  }

  hentBildeListeForsteGang () {
    this.setState({ henterBilder: true});
    fetch('https://min-bursdag.firebaseio.com/testmini69.json').then(response => {
      if (response.ok) {
        response.json().then(bilder => {
          this.byggBildeliste(bilder);
          this.setState({ henterBilder: false, valgtBildeindeksForVisning: 0});
          this.startIntervall();
        });
      }
    }).catch(() => {
      console.log('Kunne ikke hente bilder');
    });
  }

  hentBildeListe () {
    fetch('https://min-bursdag.firebaseio.com/testmini69.json').then(response => {
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
    const alleBilder = isEmpty(this.state.alleBilder) ? [] : this.state.alleBilder;
    forIn(bilder, bilde => {
      if (!some(alleBilder, b => b.id === bilde.id)) {
        alleBilder.push(bilde);
      }
    });
    const sortertListe = orderBy(alleBilder, 'datoLagret', 'asc');
    this.setState({alleBilder: sortertListe});
  }

  startIntervall () {
    setInterval(() => this.settBildeindeksForVisning(), 6000);
  };

  valgtBildeForVisningErSisteBildeILista () {
    return this.state.valgtBildeindeksForVisning === (this.state.alleBilder.length - 1);
  }

  settBildeindeksForVisning () {
    const bildeindeksForVisning = this.valgtBildeForVisningErSisteBildeILista() ? 0 : this.state.valgtBildeindeksForVisning + 1;
    this.setState({ valgtBildeindeksForVisning: bildeindeksForVisning});
  }

  render() {
    if(this.state.henterBilder) {
      return <Loader/>;
    }

    const listUtBilde = () => {
      if (!isEmpty(this.state.alleBilder)) {
        const bilde = this.state.alleBilder[this.state.valgtBildeindeksForVisning];
        return <div><img className="bilde" alt="your image" src={bilde.data}/></div>;
      }
    };

    return (
      <div className="bildevisning">
        {listUtBilde()}
      </div>
    );
  }
};

export default Slideshow;