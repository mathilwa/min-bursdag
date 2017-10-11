import React from 'react';
import VisibleIf from './VisibleIf.jsx';
import Loader from './Loader.jsx';
import { isEmpty } from 'lodash';
import moment from 'moment';

const suksessmeldinger = [
  'Bildet ble lastet opp. Kommer straks på en skjerm nær deg! ' + String.fromCodePoint(0x270C),
  'Rått! Takk for bildet ' + String.fromCodePoint(0x1F64F),
  'Dette gikk jo bra! ' + String.fromCodePoint(0x1F44F) + ' Se det på skjermen om litt',
  'Bildet ble lastet opp! ' + String.fromCodePoint(0x1F446),
  'Dette så jo ut til å funke det! Flaks ' + String.fromCodePoint(0x1F648),
  'Jei! Takk! ' + String.fromCodePoint(0x1F64B) + ' Det dukker straks opp på skjermen!',
  'Jada! Ditt fantastiske bidrag vil snart dukke opp på skjermen ' + String.fromCodePoint(0x1F60E),
];

class Filopplaster extends React.Component {
  constructor(props) {
    super(props);
    this.settPreviewBilde = this.settPreviewBilde.bind(this);
    this.lagreBilde = this.lagreBilde.bind(this);
    this.settStatusForOpplasting = this.settStatusForOpplasting.bind(this);
    this.settTilbakeStatusForOpplastingOgVisSuksessmelding = this.settTilbakeStatusForOpplastingOgVisSuksessmelding.bind(this);
    this.state = {
      bilde: '',
      bildefil: {},
      bildeLastesOpp: false,
      suksessmeldingVises: false,
    }
  }

  settPreviewBilde () {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.setState({bilde: e.target.result});
    };
    reader.readAsDataURL(document.getElementById('filopplaster').files[0]);
    const bildedata = document.getElementById('filopplaster').files[0];
    this.settStatusForOpplasting();
    setTimeout(() => this.lagreBilde(this.state.bilde, bildedata), 3000);
  }

  settStatusForOpplasting () {
    this.setState({bildeLastesOpp: true});
    setTimeout(() => this.settTilbakeStatusForOpplastingOgVisSuksessmelding(), 1500);
  }

  settTilbakeStatusForOpplastingOgVisSuksessmelding () {
    this.setState({bildeLastesOpp: false, suksessmeldingVises: true});
    setTimeout(() => this.setState({suksessmeldingVises: false}), 3000);
  }

  lagreBilde (bildedata, file) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const bildeForLagring = {
      data: bildedata,
      filnavn: file.name,
      storrelse: file.size,
      datoLagret: moment(),
    };

    fetch('https://min-bursdag.firebaseio.com/test.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(bildeForLagring),
    });
  }

  velgSuksesstekst () {
    const indeks = Math.floor(Math.random() * suksessmeldinger.length);
    return suksessmeldinger[indeks];
  }

  render() {
    const filopplasterSkalVises = !this.state.bildeLastesOpp && !this.state.suksessmeldingVises;

    if(this.state.bildeLastesOpp) {
      return <Loader/>;
    }

    const emojiTada = String.fromCodePoint(0x1F389);
    const imgSKalVisesIHTML = !this.state.suksessmeldingVises;

    return (
        <form className="filopplaster-form">
          <VisibleIf isVisible={filopplasterSkalVises}>
            <div>
              <p>Ta bilder og del dem med festen {emojiTada}</p>
              <input id="filopplaster" type="file" multiple accept="image/*" capture="camera" onChange={this.settPreviewBilde}/>
              <label htmlFor="filopplaster" className="ikon-container">
                <div className="ikontekst-container"><div className="ikontekst">Ta bilde</div></div>
                <i className="fa fa-camera-retro" aria-hidden="true"/>
              </label>
            </div>
          </VisibleIf>
          <VisibleIf isVisible={imgSKalVisesIHTML}>
            <img id="preview-image" alt="your image" style={{visibility: 'hidden'}}/>
          </VisibleIf>
          <VisibleIf isVisible={this.state.suksessmeldingVises}>
            <div className="suksessmelding">
              <p>{this.velgSuksesstekst()}</p>
            </div>
          </VisibleIf>
        </form>
    )
  }
};

export default Filopplaster;
