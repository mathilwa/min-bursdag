import React from 'react';
import VisibleIf from './VisibleIf.jsx';
import { isEmpty } from 'lodash';
import moment from 'moment';

class Filopplaster extends React.Component {
  constructor(props) {
    super(props);
    this.settPreviewBilde = this.settPreviewBilde.bind(this);
    this.lagreBilde = this.lagreBilde.bind(this);
    this.slettBilde = this.slettBilde.bind(this);
    this.clearBildeFraState = this.clearBildeFraState.bind(this);
    this.state = {
      bilde: '',
      bildefil: {},
    }
  }

  settPreviewBilde () {
    const reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("preview-image").src = e.target.result;
      this.setState({bilde: e.target.result});
    };
    reader.readAsDataURL(document.getElementById('filopplaster').files[0]);
    const bildedata = document.getElementById('filopplaster').files[0];
    setTimeout(() => this.lagreBilde(this.state.bilde, bildedata), 3000);
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

    console.log('noe bildegreier', bildeForLagring);
    fetch('https://min-bursdag.firebaseio.com/bilder.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(bildeForLagring),
    });
    this.slettBilde();
  }

  slettBilde () {
    document.getElementById("preview-image").src = undefined;
    this.clearBildeFraState();
  }

  clearBildeFraState () {
    this.setState({ bilde: '', bildefil: {}});
  }

  render() {
    const filopplasterSkalVises = isEmpty(this.state.bilde);
    const bildeStyle = {visibility: 'hidden'};

    return (
        <form className="filopplaster-form">
          <VisibleIf isVisible={filopplasterSkalVises}>
            <div>
              <input id="filopplaster" type="file" multiple accept="image/*" capture="camera" onChange={this.settPreviewBilde}/>
              <label htmlFor="filopplaster" className="ikon-container">
                <div className="ikontekst-container"><div className="ikontekst">Ta bilde</div></div>
                <i className="fa fa-camera-retro" aria-hidden="true"/>
              </label>
            </div>
          </VisibleIf>
          <img id="preview-image" alt="your image" style={bildeStyle}/>
        </form>
    )
  }
};

export default Filopplaster;
