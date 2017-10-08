import React from 'react';
import VisibleIf from './VisibleIf.jsx';
import Loader from './Loader.jsx';
import { isEmpty } from 'lodash';
import moment from 'moment';

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
    setTimeout(() => this.settTilbakeStatusForOpplastingOgVisSuksessmelding(), 2000);
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

    fetch('https://min-bursdag.firebaseio.com/bilder.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(bildeForLagring),
    });
  }

  render() {
    const filopplasterSkalVises = !this.state.bildeLastesOpp && !this.state.suksessmeldingVises;

    if(this.state.bildeLastesOpp) {
      return <Loader/>;
    }

    return (
        <form className="filopplaster-form">
          <VisibleIf isVisible={filopplasterSkalVises}>
            <div>
              <p>Ta bilder og del dem med festen</p>
              <input id="filopplaster" type="file" multiple accept="image/*" capture="camera" onChange={this.settPreviewBilde}/>
              <label htmlFor="filopplaster" className="ikon-container">
                <div className="ikontekst-container"><div className="ikontekst">Ta bilde</div></div>
                <i className="fa fa-camera-retro" aria-hidden="true"/>
              </label>
            </div>
          </VisibleIf>
          <img id="preview-image" alt="your image" style={{visibility: 'hidden'}}/>
          <VisibleIf isVisible={this.state.suksessmeldingVises}>
            <div className="suksessmelding">
              <i className="fa fa-check" aria-hidden="true"/>
              <p>Bildet ble lastet opp. Kommer straks på en skjerm nær deg!</p>
            </div>
          </VisibleIf>
        </form>
    )
  }
};

export default Filopplaster;
