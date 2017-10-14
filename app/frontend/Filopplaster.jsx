import React from 'react';
import VisibleIf from './VisibleIf.jsx';
import Loader from './Loader.jsx';
import { isEmpty } from 'lodash';
import moment from 'moment';
const fixOrientation = require('fix-orientation');

const hentMindreDataUrl = (img, width, height) => {
  const canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d');

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL();
};

const suksessmeldinger = [
  'Bildet ble lastet opp. Kommer straks på en skjerm nær deg! ' + String.fromCodePoint(0x270C),
  'Rått! Takk for bildet ' + String.fromCodePoint(0x1F64F) + ' Det dukker straks opp på skjermen!',
  'Dette gikk jo bra! ' + String.fromCodePoint(0x1F44F) + ' Se det på skjermen om litt',
  'Bildet ble lastet opp! ' + String.fromCodePoint(0x1F446),
  'Dette så jo ut til å funke det! Flaks ' + String.fromCodePoint(0x1F648),
  'Jei! Takk! ' + String.fromCodePoint(0x1F64B) + ' Bildet dukker straks opp på skjermen!',
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
      minibilde: '',
      bildeLastesOpp: false,
      suksessmeldingVises: false,
    }
  }

  settPreviewBilde () {
    let nyUri = '';
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById('preview-image').src = e.target.result;

      fixOrientation(e.target.result, { image: true }, function (fixed, image) {
        const img = new Image();
        img.src = fixed;
        document.getElementById('preview-image-container').appendChild(img);
      });

      const img = new Image;
      img.onload = function () {
        setTimeout(() => {
          const bredde = document.getElementById('preview-image-container').getElementsByTagName('img')[0].clientWidth;
          const hoyde = document.getElementById('preview-image-container').getElementsByTagName('img')[0].clientHeight;

          nyUri = hentMindreDataUrl(this, bredde * 0.50, hoyde * 0.50);
          fixOrientation(nyUri, { image: true }, function (fixed, image) {
            const img = new Image();
            img.src = fixed;
            document.getElementById('preview-image-2container').appendChild(img);
          });

          document.getElementById('preview-image').src = undefined;
        }, 2000)
      };

      img.src = e.target.result;
      document.getElementById('preview-image-mini-container').appendChild(img);
      // this.setState({minibilde: img.src})
    };
    reader.readAsDataURL(document.getElementById('filopplaster').files[0]);
    const bildedata = document.getElementById('filopplaster').files[0];
    this.settStatusForOpplasting();
    setTimeout(() => this.lagreBilde(bildedata), 5000);
  }


  settStatusForOpplasting () {
    this.setState({bildeLastesOpp: true});
    setTimeout(() => this.settTilbakeStatusForOpplastingOgVisSuksessmelding(), 1500);
  }

  settTilbakeStatusForOpplastingOgVisSuksessmelding () {
    this.setState({bildeLastesOpp: false, suksessmeldingVises: true});
    setTimeout(() => this.setState({suksessmeldingVises: false}), 3000);
  }

  lagreBilde (file) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const minibildedata = document.getElementById('preview-image-mini-container').getElementsByTagName('img')[0].src;
    const bildedata = document.getElementById('preview-image-container').getElementsByTagName('img')[0].src;
    document.getElementById('preview-image-mini').src = undefined;
    const id = bildedata.slice(69, 75) + (Math.random() * 100).toString();

    const minibildeForLagring = {
      data: minibildedata,
      id: id,
    };

    const bildeForLagring = {
      data: bildedata,
      filnavn: file.name,
      storrelse: file.size,
      datoLagret: moment(),
      id: id,
    };

    fetch('https://min-bursdag.firebaseio.com/snartbursdag.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(bildeForLagring),
    });

    fetch('https://min-bursdag.firebaseio.com/testmini69.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(minibildeForLagring),
    });
  }

  velgSuksesstekst () {
    const indeks = Math.floor(Math.random() * suksessmeldinger.length);
    return suksessmeldinger[indeks];
  }

  render() {
    const filopplasterSkalVises = !this.state.bildeLastesOpp && !this.state.suksessmeldingVises;


    const emojiTada = String.fromCodePoint(0x1F389);
    const imgSKalVisesIHTML = !this.state.suksessmeldingVises;

    return (
        <form className="filopplaster-form">
          <VisibleIf isVisible={this.state.bildeLastesOpp}>
            <Loader/>
          </VisibleIf>
          <VisibleIf isVisible={!this.state.bildeLastesOpp}>
            <div>
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
              <VisibleIf isVisible={this.state.suksessmeldingVises}>
                <div className="suksessmelding">
                  <p>{this.velgSuksesstekst()}</p>
                </div>
              </VisibleIf>
            </div>
          </VisibleIf>
          <div>
            <img id="preview-image" alt="your image" style={{visibility: 'hidden'}}/>
            <img id="preview-image-mini" alt="your mini-image" style={{visibility: 'hidden'}}/>
          </div>
          <div id="preview-image-container" style={{visibility: 'hidden'}}></div>
          <div id="preview-image-2container"></div>
          <div id="preview-image-mini-container" ></div>
        </form>
    )
  }
};

export default Filopplaster;
